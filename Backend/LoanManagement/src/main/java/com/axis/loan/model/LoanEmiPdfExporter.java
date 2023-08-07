package com.axis.loan.model;

import java.awt.Color;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

public class LoanEmiPdfExporter {
	
	private List<LoanEMI> loanEmi;

	public LoanEmiPdfExporter() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LoanEmiPdfExporter(List<LoanEMI> loanEmi) {
		super();
		this.loanEmi = loanEmi;
	}

	private void writeTableHeader(PdfPTable table) {
		PdfPCell cell = new PdfPCell();
		cell.setBackgroundColor(Color.pink);
		cell.setPadding(5);

		Font font = FontFactory.getFont(FontFactory.HELVETICA);
		font.setColor(Color.WHITE);

		cell.setPhrase(new Phrase("Loan-ID", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Loan-Date", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Principal-Amount", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Loan-EMI", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Monthly-Interest", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Remaining-Amount", font));
		table.addCell(cell);

	}

	private void writeTableData(PdfPTable table) {
		for (LoanEMI listOfLoanEmi : loanEmi) {
			table.addCell(String.valueOf(listOfLoanEmi.getLoanId()));
			table.addCell(String.valueOf(listOfLoanEmi.getDate()));
			table.addCell(String.valueOf(listOfLoanEmi.getPrincipal()));
			table.addCell(String.valueOf(listOfLoanEmi.getTotalPayment()));
			table.addCell(String.valueOf(listOfLoanEmi.getInterest()));
			table.addCell(String.valueOf(listOfLoanEmi.getRemainingBalance()));
		}
	}

	public void export(HttpServletResponse response) throws DocumentException, IOException {
		Document document = new Document(PageSize.A2);
		PdfWriter.getInstance(document, response.getOutputStream());

		document.open();
		Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font.setSize(18);
		font.setColor(Color.BLUE);

		Paragraph p = new Paragraph("Loan Statement", font);
		p.setAlignment(Paragraph.ALIGN_CENTER);

		document.add(p);
		PdfPTable table = new PdfPTable(6);
		table.setWidthPercentage(100f);
		table.setWidths(new float[] { 1.5f, 2.0f, 3.0f, 2.0f, 2.0f, 2.0f});
		table.setSpacingBefore(10);
		table.setSpacingBefore(10);

		writeTableHeader(table);
		writeTableData(table);

		document.add(table);

		document.close();

	}
	
	public File export() throws DocumentException, IOException {
	    // Create a temporary file to save the exported PDF
	    File tempFile = File.createTempFile("loan_emis", ".pdf");

	    // Create the PDF document
	    Document document = new Document(PageSize.A2);
	    PdfWriter.getInstance(document, new FileOutputStream(tempFile));

	    document.open();
	    Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
	    font.setSize(18);
	    font.setColor(Color.BLUE);

	    Paragraph p = new Paragraph("List of Transactions", font);
	    p.setAlignment(Paragraph.ALIGN_CENTER);

	    document.add(p);
	    PdfPTable table = new PdfPTable(6);
	    table.setWidthPercentage(100f);
	    table.setWidths(new float[]{1.5f, 2.0f, 3.0f, 2.0f, 2.0f, 2.0f});
	    table.setSpacingBefore(10);
	    table.setSpacingBefore(10);

	    writeTableHeader(table);
	    writeTableData(table);

	    document.add(table);

	    document.close();

	    return tempFile;
	}


	

}
