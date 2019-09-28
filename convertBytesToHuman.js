/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  // your solution goes here
  var types = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var b = 0;
  if (Number.isFinite(bytes) == false || bytes < 0) {
    return false;
  }
  var i = 0;
  while (bytes >= b) {
    if (b == 0) {
      b = 1;
    }
    b *= 1024;
    i += 1;
  } 
  b /= 1024;
  bytes = String(+(bytes / b).toFixed(2)) + " " + types[i-1];
  return bytes;
}
