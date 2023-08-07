package com.axis.transaction.pdfexporter;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import java.awt.Color;
import java.io.IOException;

import com.axis.transaction.model.Transaction;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;

public class TransactionPDFExporter {

	private List<Transaction> transactions;

	public TransactionPDFExporter(List<Transaction> transactions) {
		this.transactions = transactions;
	}

	private void writeTableHeader(PdfPTable table) {
		PdfPCell cell = new PdfPCell();
		cell.setBackgroundColor(Color.pink);
		cell.setPadding(5);

		Font font = FontFactory.getFont(FontFactory.HELVETICA);
		font.setColor(Color.WHITE);

		cell.setPhrase(new Phrase("Transaction-ID", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("CustomerAccountNumber", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("CustomerUserName", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("TargetAccountNumber", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("TargetIFSCCode", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("TargetOwnerName", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Amount", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("InitiationDate", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("TransactionType", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("TransactionStatus", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("TransactionNote", font));
		table.addCell(cell);

	}

	private void writeTableData(PdfPTable table) {
		for (Transaction transaction : transactions) {
			table.addCell(String.valueOf(transaction.getTransactionId()));
			table.addCell(String.valueOf(transaction.getCustomerAccountNumber()));
			table.addCell(transaction.getCustomerUserName());
			table.addCell(String.valueOf(transaction.getTargetAccountNumber()));
			table.addCell(transaction.getTargetIFSCCode());
			table.addCell(transaction.getTargetOwnerName());
			table.addCell(String.valueOf(transaction.getAmount()));
			table.addCell(String.valueOf(transaction.getInitiationDate()));
			table.addCell(String.valueOf(transaction.getTransactionType()));
			table.addCell(String.valueOf(transaction.getTransactionStatus()));
			table.addCell(transaction.getTransactionNote());
		}
	}

	public void export(HttpServletResponse response) throws DocumentException, IOException {
		Document document = new Document(PageSize.A2);
		PdfWriter.getInstance(document, response.getOutputStream());

		document.open();
		Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font.setSize(18);
		font.setColor(Color.BLUE);

		Paragraph p = new Paragraph("List of Transactions", font);
		p.setAlignment(Paragraph.ALIGN_CENTER);

		document.add(p);
		PdfPTable table = new PdfPTable(11);
		table.setWidthPercentage(100f);
		table.setWidths(new float[] { 1.5f, 2.0f, 3.0f, 2.0f, 2.0f, 2.0f, 2.0f, 3.0f, 1.5f, 2.0f, 1.5f });
		table.setSpacingBefore(10);
		table.setSpacingBefore(10);

		writeTableHeader(table);
		writeTableData(table);

		document.add(table);

		document.close();

	}

}
