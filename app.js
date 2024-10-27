import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {getAuth,GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword,onAuthStateChanged,signOut,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
const firebaseConfig = {
   apiKey: "AIzaSyA019g3xChv5n_N1Zc5RRxmO-EG-brJ0OY",
   authDomain: "sivapol-39216.firebaseapp.com",
   projectId: "sivapol-39216",
   storageBucket: "sivapol-39216.appspot.com",
   messagingSenderId: "142165691245",
   appId: "1:142165691245:web:8eaa567a5dd1d3055f6864"
 };


//กำหนดตัวแปร
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider =new GoogleAuthProvider();   //กำหนดตัวแปร provider  api ที่เกี่ยวข้องคือ GoogleAuthProvider,signInWithPopup

const form = document.getElementById("registerForm")
const formarea = document.getElementById("form-area")
const profile = document.getElementById("profile")
const welcome = document.getElementById("welcome")
const welcome2 = document.getElementById("welcome2")
const logout=document.getElementById("logout")
const logout2=document.getElementById("logout2")
const loginForm = document.getElementById("loginForm")
const classroom =document.getElementById("classroom")
const iframe =document.getElementById("iframe")
const iframe2 =document.getElementById("iframe2")
const iframe3 =document.getElementById("iframe3")
const btnregister =document.getElementById("btn-register")
const cancle =document.getElementById("btn-cancle")
const btnhome = document.getElementById("home")
const btnStudent =document.getElementById("class-student")
const btnEdit = document.getElementById("class-edit")
const btnHTML= document.getElementById("class-Editor")
const formarea2=document.getElementById("form-area2")



  //-------------------------------------- login google---------------------

const googleLogin= document.getElementById("google-login-btn") //กำหนดตัวแปรเพื่อเรียก api ของ กูเกิล เมื่อกดปุ่มลงทะเบียนด้วย Google
googleLogin.addEventListener("click",function(){
 
         showModalSpinner();

      //-----------------------------------------------------//
    // setTimeout(function() {
     // showModalSpinner();
    //  alert("ลงชื่อเข้าใช้ด้วยอีเมลสำเร็จ!...");     
   //   hideModalSpinner();
     
     //   }, 3000); 

        //--------------------------------//

    signInWithPopup(auth,provider)                           //เปิดหน้าต่าง Google login 
    .then((result) => {

        const credential =GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;   
        
        
        //ตรวจสอบผู้ใช้งานล็อกอินด้วย Gmail สำเร็จ
       // window.location.href="index.html" //รีไดเร็กกลับมาที่หน้า index.html ใช้ไม่ใช้ก็ได้
    }).catch((error)=>{
      const reeorCode =error.code;
      const errorMessage= error.message;
     
    });
})  
   
  //-------------------------------------- login google---------------------


//กดปุ่มลงทะเบียนใหม่
form.style.display="none"
 formarea2.style.display="none"

var btnRegister = document.getElementById('btn-register')
// ตรวจสอบว่าปุ่มมีอยู่ใน DOM
if (btnRegister) {
    // เพิ่ม event listener สำหรับการคลิกปุ่ม
    btnRegister.addEventListener('click', function() {
       // alert("กำลังเปลี่ยนเส้นทางเป็นห้องเรียนโค้ดดิ้งออนไลน์ค่ะ")
        form.style.display="block"
        loginForm.style.display="none"
        formarea2.style.display="none"
      
      });
} else {
    console.error('เกิดข้อผิดพลาด');
    alert("เกิดข้อผิดพลาดหรืออีเมลซ้ำ");
}


//กดปุ่มยกเลิกหน้าลงทะเบียน

var btnCancle = document.getElementById('btn-Cancel')
// ตรวจสอบว่าปุ่มมีอยู่ใน DOM
if (btnCancle) {
    // เพิ่ม event listener สำหรับการคลิกปุ่ม
    btnCancle.addEventListener('click', function() {
        //alert("กำลังเปลี่ยนเส้นทางเป็นห้องเรียนโค้ดดิ้งออนไลน์ค่ะ")
       form.style.display="none"
       loginForm.style.display="block"
      
      });
} else {
    console.error('เกิดข้อผิดพลาด');
}


//ส่งค่าเมื่อกดปุ่ม submit form
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const email = form.email.value
    const password = form.password.value
    createUserWithEmailAndPassword(auth,email,password)
    .then((result)=>{
        alert("สร้างบัญชีผู้ใช้เรียบร้อย")
        form.email.value =""
        form.password.value =""
    }).catch((error)=>{   //ถ้าสร้างรายชื่อไม่สำเร็จแสดงข้อความ
       // alert(error.message)  ข้อความ errorจากระบบ
        alert("อีเมลนี้ถูกใช้งานแล้วกรุณาเปลี่ยนใหม่ครับ..");
    })
})

    //login  อัตโนมัติเมื่อลงทะเบียนสำเร็จ
onAuthStateChanged(auth,(user)=>{
    if(user){
        profile.style.display="block"
        formarea.style.display="none"
         formarea2.style.display="block"/////////////////ใหม่
      //   formarea2.style.display="none"//////ใหม่

        iframe2.style.display="none" //ส่วนดึงข้อมูลมาแสดง
        iframe3.style.display="none"  //ส่วนดึงข้อมูลมาแสดง
        welcome.innerText=`อีเมล : ${user.email}`
        welcome2.innerText=`อีเมล : ${user.email}`
        form.email.value =""  //ส่งค่าว่างคืน
        form.password.value ="" //ส่งค่าว่างคืน
      
    }else{  //หากล็อกอินไม่สำเร็จ ให้หน้าล็อกกินแสดงผลอีกรอบ ซ่อนหน้าโปรไฟล์ไว้
      
       profile.style.display="none"
       formarea.style.display="block"
        formarea2.style.display="none"
        /* loginForm.style.disply="none"*/
        form.email.value =""
        form.password.value =""
    }
})



// ปุ่มล็อกเอาท์ออกจากระบบ 1

logout.addEventListener("click",(e)=>{
    signOut(auth).then(()=>{

        alert("ออกจากระบบเรียบร้อย")
        form.email.value =""
        form.password.value =""
      // window.location="login.html"

    formarea2.style.display="none"
    
       // location.reload();
     
    }).catch((error)=>{
        alert(error.message)
    })
})

// ปุ่มล็อกเอาท์ออกจากระบบ 2-------------------------
//logout2.addEventListener("click",(e)=>{
  //  signOut(auth).then(()=>{
    //    alert("ออกจากระบบเรียบร้อย")
      //  form.email.value =""
        //form.password.value =""
       
        // หลังจากลบแล้วให้รีเฟสหน้าจอ
    //formarea2.style.display="none"
     //   location.reload();
     
    //}).catch((error)=>{
      //  alert(error.message)
    //})
//})

//----------------------------------------------

    // ตรวจสอบการล็อกอิน

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const email = loginForm.email.value
    const password = loginForm.password.value
    signInWithEmailAndPassword(auth,email,password)
    .then((result)=>{
      
        showModalSpinner();
     
        form.email.value =""
        form.password.value =""
       // location.reload();
             
    }).catch((error)=>{  //หากล็อกอินไม่สำเร็จ 
       // alert(error.message)
        alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง....")
    })
})

// ฟังก์ชันแสดง modal spinner---------------------------------------------------------------------//
function showModalSpinner() {
  document.getElementById("modal").style.display = "flex";
  //-----------------------------------------------------//
  setTimeout(function() {
    //showModalSpinner();
   // alert("ลงชื่อเข้าใช้งานสำเร็จ!");     
    hideModalSpinner();
  
      }, 3000); 

      //--------------------------------//
}

// ฟังก์ชันซ่อน modal spinner
function hideModalSpinner() {
  document.getElementById("modal").style.display = "none";
}

// เพิ่มเหตุการณ์เมื่อกดปุ่มล็อกอิน
//document.getElementById("loginButton").addEventListener("click", function() {
 // showModalSpinner();
  
  // สมมุติว่าทำการล็อกอินสำเร็จหลังจาก 2 วินาที
  
//});

//----------------------------------------------------------------------------------------------//