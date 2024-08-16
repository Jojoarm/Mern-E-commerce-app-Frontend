const displayNIGCurrency = (num) => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NIG',
    minimumFractionDigits: 2,
  });

  return formatter.format(num);
};

export default displayNIGCurrency;
