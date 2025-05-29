import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import Informations from "./Partials/Informations";
import { Button } from "antd";
import { Download, FileIcon, FileText, ImageIcon, Paperclip } from "lucide-react";

export default function Edit({
  auth,
  mustVerifyEmail,
  status,
  employe,
  documents,
}) {
  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Profile" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <Informations employe={employe} />
          </div>
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <section className="max-w-xl">
              <header>
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <Paperclip className="inline h-5 w-5 mr-2 text-gray-600" />
                  Documents
                </h2>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {documents.map((doc) => {
                  const isImage = [
                    "jpg",
                    "jpeg",
                    "png",
                    "gif",
                    "svg",
                    "avif",
                    "webp",
                  ].includes(doc.file_extension);
                  const isPdf = doc.file_extension === "pdf";

                  return (
                    <div
                      key={doc.id}
                      className="group relative flex flex-col gap-2 rounded-lg border bg-white transition-all hover:border-primary/50 hover:shadow-md"
                    >
                      {/* Preview Section */}
                      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-lg bg-gray-100">
                        {isImage ? (
                          <img
                            src={doc.file_path}
                            alt={doc.file_name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            {isPdf ? (
                              <FileText className="h-16 w-16 text-muted-foreground" />
                            ) : (
                              <FileIcon className="h-16 w-16 text-muted-foreground" />
                            )}
                          </div>
                        )}

                        {/* Overlay with actions */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                          {(isImage || isPdf) && (
                            <Button
                              variant="solid"
                              color="primary"
                              title="View document"
                              size="sm"
                              className="h-8"
                              onClick={() =>
                                window.open(doc.file_path, "_blank")
                              }
                            >
                              <ImageIcon className="mr-2 h-4 w-4" />
                              View
                            </Button>
                          )}
                          <a
                            className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md text-sm cursor-pointer"
                            title="Download document"
                            href={route("employe.employes.documents.download", {
                              employe: employe.id,
                              document: doc.id,
                            })}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </a>
                        </div>
                      </div>

                      {/* Info Section */}
                      <div className="flex flex-col gap-2 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-sm font-medium truncate"
                              title={doc.file_name}
                            >
                              {doc.file_name}
                            </p>
                            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                              <span
                                className="truncate"
                                title={doc.file_extension}
                              >
                                {doc.file_extension.toUpperCase()}
                              </span>
                              <span>•</span>
                              <span>{formatFileSize(doc.file_size)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
