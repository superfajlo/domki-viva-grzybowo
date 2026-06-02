for (let i = 1; i <= 17; i++) {
  for (const prefix of ["", "th"]) {
    const url = `http://www.grzybowo-noclegi.pl/wp-content/uploads/2014/05/${prefix}${i}.jpg`;
    const res = await fetch(url, { method: "HEAD" });
    if (res.ok) console.log(res.status, res.headers.get("content-length"), url);
  }
}
