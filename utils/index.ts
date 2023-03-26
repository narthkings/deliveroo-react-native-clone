function formatter(opt: any) {
   return new Intl.NumberFormat("en-NG",
        { style: "currency", currency: "NGN" }).format(opt);
}

export default formatter;