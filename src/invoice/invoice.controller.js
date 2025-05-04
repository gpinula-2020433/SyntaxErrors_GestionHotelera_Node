import Invoice from './invoice.model.js'
import Room from '../room/room.model.js'

// Obtener todas las facturas
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('customer', 'username email')
      .populate('room', 'roomNumber pricePerNight')

    return res.send({ success: true, invoices })
  } catch (err) {
    return res.status(500).send({ success: false, message: 'General error', err })
  }
}

// Obtener facturas por cliente
export const getInvoicesByCustomer = async (req, res) => {
  try {
    const { id } = req.params
    const invoices = await Invoice.find({ customer: id })
      .populate('room', 'roomNumber pricePerNight')

    if (invoices.length === 0) {
      return res.status(404).send({ success: false, message: 'No invoices found for this customer' })
    }

    return res.send({ success: true, invoices })
  } catch (err) {
    return res.status(500).send({ success: false, message: 'General error', err })
  }
}

// Obtener factura por ID
export const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params
    const invoice = await Invoice.findById(id)
      .populate('customer', 'username email')
      .populate('room', 'roomNumber pricePerNight')

    if (!invoice) {
      return res.status(404).send({ success: false, message: 'Invoice not found' })
    }

    return res.send({ success: true, invoice })
  } catch (err) {
    return res.status(500).send({ success: false, message: 'General error', err })
  }
}

// Actualizar factura (solo NIT y typeOfPayment)
export const updateInvoice = async (req, res) => {
  try {
      const { id } = req.params
      const { NIT, typeOfPayment } = req.body

      const invoice = await Invoice.findByIdAndUpdate(
          id,
          { NIT, typeOfPayment },
          { new: true }
      )

      if (!invoice) return res.status(404).send({ message: 'Invoice not found' })

      return res.send({ success: true, message: 'Invoice updated', invoice })
  } catch (err) {
      return res.status(500).send({ message: 'General error', err })
  }
}
