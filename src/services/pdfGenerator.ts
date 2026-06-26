import { jsPDF } from 'jspdf';
import type { PrayerData } from '../data/prayers';
import type { Product } from '../types';

/**
 * Gera PDF com orações ungidas
 */
export const generatePrayerPDF = (prayers: PrayerData[]): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  let yPosition = 20;
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = doc.internal.pageSize.getWidth() - 2 * margin;

  prayers.forEach((prayer, index) => {
    // Título
    doc.setFontSize(16);
    doc.setTextColor(199, 167, 92); // Gold
    doc.text(prayer.name, margin, yPosition);
    yPosition += 10;

    // Descrição / Edição
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Edition: ${prayer.edition} • Downloaded on: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 8;

    // Separador
    doc.setDrawColor(199, 167, 92);
    doc.line(margin, yPosition, doc.internal.pageSize.getWidth() - margin, yPosition);
    yPosition += 8;

    // Texto da oração
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    const splitText = doc.splitTextToSize(prayer.text, maxWidth);
    
    splitText.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 6;
    });

    // Instruções
    yPosition += 8;
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.setFont('Helvetica', 'oblique');
    const splitInstructions = doc.splitTextToSize(`Instructions: ${prayer.instructions}`, maxWidth);
    splitInstructions.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });
    doc.setFont('Helvetica', 'normal');

    // Espaço entre orações
    yPosition += 15;

    // Nova página se necessário e se não for a última oração
    if (index < prayers.length - 1 && yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = margin;
    }
  });

  // Salvar
  doc.save('anointed-prayers.pdf');
};

/**
 * Gera eBook com guia de frequências
 */
export const generateFrequencyGuide = (frequencies: Product[]): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  let yPosition = 20;
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = doc.internal.pageSize.getWidth() - 2 * margin;

  // Capa
  doc.setFontSize(24);
  doc.setTextColor(199, 167, 92);
  doc.text('Sacred Frequencies Guide', margin, yPosition);
  yPosition += 15;

  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('A comprehensive manual on Solfeggio sound therapy', margin, yPosition);
  yPosition += 8;
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);

  doc.addPage();
  yPosition = margin;

  // Frequências
  frequencies.forEach((freq) => {
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = margin;
    }

    // Título
    doc.setFontSize(14);
    doc.setTextColor(199, 167, 92);
    const titleText = freq.hz ? `${freq.hz} Hz - ${freq.name}` : freq.name;
    doc.text(titleText, margin, yPosition);
    yPosition += 8;

    // Descrição
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const splitText = doc.splitTextToSize(freq.description, maxWidth);
    
    splitText.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });

    // Benefícios
    if (freq.benefits && freq.benefits.length > 0) {
      yPosition += 5;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Key Benefits:', margin, yPosition);
      yPosition += 5;
      doc.setTextColor(50, 50, 50);
      freq.benefits.forEach((benefit) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(`• ${benefit}`, margin + 5, yPosition);
        yPosition += 5;
      });
    }

    yPosition += 12;
  });

  doc.save('sacred-frequencies-guide.pdf');
};
