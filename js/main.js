//Tìm bội chung lớn nhất

function uocChungLonNhat(num1,num2){
  if(num1 < 0){
    num1 *= (-1);
  }
  if(num2 < 0){
    num2 *= (-1);
  }
  if(num1 == 0){
    return num2;
  }else if(num2 == 0){
    return num1;
  }
  while(num1 != num2){
    if(num1 > num2){
      num1 -= num2;
    }else{
      num2 -= num1;
    }
  }
  return num1;
}

//Đối tượng phân số cơ bản
function phanso(tu,mau){
  this.tu = tu;
  this.mau = mau;

  this.typeDiff = () => {
    return ` ${this.tu}/${this.mau}`;//có tử = 3 mẫu = 4 thì trả về 3/4
  }

  this.toiGian = ()=>{
    let uocChung = uocChungLonNhat(this.tu,this.mau);
    this.tu /= uocChung;
    this.mau /= uocChung;
    if(this.tu % this.mau == 0){
      return `${this.tu / this.mau}`;
    }
    return this.typeDiff();
  }

}

function toPhanSo(string){//Chuyển string sang dạng phân số có tử và mẫu
  let index = -1;
  if(isNaN(string)){
    try{
      index = string.search('/');
    }catch(Error){
      throw "Lỗi dữ liệu truyền vào";
    }
  }
  if (index < 0){
    return convertPhanSo(string);
  } else if(index === string.length - 1){
     throw `Không tồn tại kiểu phân số ${string}`;
  } else {
     let tu = string.substring(0,index);
     let mau = string.substring(index + 1, string.length);
     if(isNumber(tu) && isNumber(mau)){
       tu = parseFloat(tu);
       mau = parseFloat(mau);
       return new phanso(tu,mau);//Trả về một đối tượng phanso(tu,mau);
     }
  }
  throw `Lỗi không thể chuyển ${string} sang phân số`;//Đề phòng có lỗi ngoài ý muốn
}

function isNumber(number){
  if(isNaN(number)){
    throw `${number} không phải là số`;
  }
  return true;
}

//Chuyển từ số thập phân sang phân số... 3.3 -> 33/10
function convertPhanSo(soThapPhan){
  if(isNumber(soThapPhan)){
      sothapPhan = soThapPhan.toString(10);
      let length = soThapPhan.length;
      // soThapPhan = parseFloat(soThapPhan);
      let mau = 1;
      while(!isNguyen(soThapPhan)){
        soThapPhan *= 10;
        mau *= 10;
      }
      return new phanso(soThapPhan,mau);
  }
}

//Kiểm tra có phải số nguyên hay k
function isNguyen(number){
  return parseInt(number) === number;
}

var x = toPhanSo("5/100");
console.log(x.toiGian());
console.log(x);
