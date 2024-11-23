'use client';

import { Task } from '@/app/types';
import { format } from 'date-fns';
import { useRef } from 'react';

interface PrintableChecklistProps {
  task: Task;
}

export default function PrintableChecklist({ task }: PrintableChecklistProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current;
    if (content) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${task.title} - Checklist</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  max-width: 210mm;
                  margin: 20mm auto;
                  padding: 0 20mm;
                }
                .header {
                  text-align: center;
                  margin-bottom: 20px;
                }
                .step {
                  margin-bottom: 15px;
                  page-break-inside: avoid;
                }
                .checkbox {
                  width: 15px;
                  height: 15px;
                  border: 1px solid #000;
                  display: inline-block;
                  margin-right: 10px;
                }
                @media print {
                  @page {
                    size: A4;
                    margin: 20mm;
                  }
                }
              </style>
            </head>
            <body>
              ${content.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div>
      <button
        onClick={handlePrint}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Print Checklist
      </button>

      <div ref={printRef} className="hidden">
        <div className="header">
          <h1>{task.title}</h1>
          <p>Created: {format(new Date(task.createdAt), 'MMM dd, yyyy')}</p>
          <p>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</p>
        </div>

        <div className="steps">
          {task.steps.map((step, index) => (
            <div key={step.id} className="step">
              <div className="checkbox"></div>
              <span className="step-number">{index + 1}.</span>
              <span className="step-title">{step.title}</span>
              {step.description && (
                <p className="step-description">{step.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}