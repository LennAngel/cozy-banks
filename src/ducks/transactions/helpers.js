/* global cozy */

import { get } from 'lodash'

export const getLabel = transaction => transaction.label.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase())
export const getBill = transaction => get(transaction, 'bills[0]')
export const loadBill = async transaction => {
  const billRef = getBill(transaction)
  console.log('billRef', billRef)
  const [billDoctype, billId] = billRef.split(':')
  return cozy.client.data.find(billDoctype, billId)
}
export const getInvoice = async transaction => {
  const billRef = getBill(transaction)
  console.log('billRef', billRef)
  const [billDoctype, billId] = billRef.split(':')
  const doc = await cozy.client.data.find(billDoctype, billId)

  return getBillInvoice(doc)
}
export const getBillInvoice = bill => {
  if (!bill.invoice) {
    throw new Error('This bill has no invoice : ', bill)
  }

  const [doctype, id] = bill.invoice.split(':')

  if (!doctype || !id) {
    throw new Error('Invoice is malformed. invoice: ' + bill.invoice)
  }

  return [doctype, id]
}
