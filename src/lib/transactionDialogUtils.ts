export const formatAmount = (value: string): string => {
  const num = parseFloat(value.replace(',', '.'));
  if (isNaN(num)) return '0,00';
  return num.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const convertTransactionTypeToScreenType = (type: string): string => {
  switch (type) {
    case 'CREDITO':
      return 'Receita';
    case 'DEBITO':
      return 'Despesa';
    case 'TRANSFERENCIA':
      return 'Transferência';
    default:
      return '';
  }
};

export const handleAmountInput = (input: string): string => {
  let value = input.replace(/\D/g, '');
  if (value.length > 2) {
    value = value.slice(0, value.length - 2) + '.' + value.slice(value.length - 2);
  } else if (value.length === 1) {
    value = '0.0' + value;
  } else if (value.length === 2) {
    value = '0.' + value;
  } else {
    value = '0.00';
  }
  return value;
};

export const amountStringToNumber = (
  value: string,
  thousandSeparator: string = '.',
  decimalSeparator: string = ','
) => {
  const cleanedValue = value.replace(new RegExp(`\\${thousandSeparator}`, 'g'), '');

  const standardizedValue = cleanedValue.replace(decimalSeparator, '.');

  return parseFloat(standardizedValue);
}