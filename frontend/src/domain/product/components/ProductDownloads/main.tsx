import { FileIcon, LockIcon, DownloadIcon } from 'lucide-react';
import { Button } from '@/core/components/button';
import { Card } from '@/core/components/card';
import type { DownloadableFile } from '../../types';

interface ProductDownloadsProps {
  files?: DownloadableFile[];
}

function ProductDownloads({ files }: ProductDownloadsProps) {
  if (!files || files.length === 0) return null;

  // Mock auth check
  const isLoggedIn = !!localStorage.getItem('auth_token');

  const handleDownload = (file: DownloadableFile) => {
    if (file.required_role && !isLoggedIn) {
      // Redirect to login or show toast
      return;
    }
    window.open(file.file_url, '_blank');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Downloads</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {files.map((file, index) => {
          const isLocked = !!file.required_role && !isLoggedIn;

          return (
            <Card key={index} className="flex items-center p-4">
              <div className="bg-muted mr-4 rounded-lg p-2">
                <FileIcon className="size-6 text-muted-foreground" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-medium">{file.file_name}</p>
                <p className="text-muted-foreground text-xs">
                  {file.file_type} • {file.file_size}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDownload(file)}
                disabled={isLocked}
                title={isLocked ? `Requer login como ${file.required_role}` : 'Download'}
              >
                {isLocked ? <LockIcon className="size-4" /> : <DownloadIcon className="size-4" />}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export { ProductDownloads };
