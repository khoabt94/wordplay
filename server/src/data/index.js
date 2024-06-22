const fs = require("fs");

fs.readFile("words.json", "utf8", (error, data) => {
  if (error) {
    console.error("Đã xảy ra lỗi khi đọc tệp:", error);
    return;
  }
  const parsed = JSON.parse(data);
  const modifed = parsed
    .map((item) => item.text)
    .filter((item) => item.split(" ").length === 2);

  fs.writeFile("result.json", JSON.stringify(modifed), "utf8", (error) => {
    if (error) {
      console.error("Đã xảy ra lỗi khi ghi vào tệp:", error);
      return;
    }
  });
});

fs.readFile("result.json", "utf8", (error, data) => {
  if (error) {
    console.error("Đã xảy ra lỗi khi đọc tệp:", error);
    return;
  }
  console.log(JSON.parse(data));
});
