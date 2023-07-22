import { GenerateInvoiceFacadeInputDto } from '../../../modules/invoice/facade/invoice.facade.interface';
import InvoiceFacadeFactory from '../../../modules/invoice/factory/facade.factory';
import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for invoice', () => {
	beforeEach(async () => {
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it('should find a invoice', async () => {
        const invoiceFacade = InvoiceFacadeFactory.create()

        const invoiceInput: GenerateInvoiceFacadeInputDto = {
            name: "Invoice name",
            document: "Invoice document",
            street: "Invoice street",
            number: "Invoice number",
            complement: "Invoice complement",
            city: "Invoice city",
            state: "Invoice state",
            zipCode: "Invoice zipCode",
            items: [{
                id: "Invoice Item id",
                name: "Invoice Item name",
                price: 10,
            }]
        }
        const generatedInvoice = await invoiceFacade.generateInvoice(invoiceInput)

		const response = await request(app)
			.get('/invoice')
			.send({
				id: generatedInvoice.id
			});

		expect(response.status).toBe(200);
		expect(response.body.id).toBeDefined();
		expect(response.body.name).toBe('Invoice name');
		expect(response.body.document).toBe('Invoice document');
		expect(response.body.address.street).toBe("Invoice street");
		expect(response.body.address.complement).toBe("Invoice complement");
		expect(response.body.address.city).toBe("Invoice city");
		expect(response.body.address.state).toBe("Invoice state");
		expect(response.body.address.zipCode).toBe("Invoice zipCode");
		expect(response.body.items[0].id).toBe("Invoice Item id");
		expect(response.body.items[0].name).toBe("Invoice Item name");
		expect(response.body.items[0].price).toBe(10);
		expect(response.body.total).toBe(10);
	});
});
