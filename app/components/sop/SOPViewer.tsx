import ReactMarkdown from 'react-markdown';
import { SOP } from '../../types';

interface SOPViewerProps {
  sop: SOP;
}

export default function SOPViewer({ sop }: SOPViewerProps) {
  return (
    <div className="prose max-w-none">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{sop.title}</h3>
        <p className="text-gray-600">{sop.description}</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <ReactMarkdown>{sop.content}</ReactMarkdown>
      </div>

      {sop.attachments.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Attachments</h4>
          <div className="space-y-2">
            {sop.attachments.map((attachment) => (
              <a
                key={attachment.id}
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-white rounded border hover:bg-gray-50"
              >
                {attachment.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}