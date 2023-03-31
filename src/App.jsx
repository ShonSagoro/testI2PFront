
import axios from 'axios';
import { useState } from 'react';
import io from "socket.io-client";

  const socket = io("http://3.133.107.127:4000");

function App() {
  const [file, setFile] = useState();
  const [nameFile, setNameFile] = useState("");
  
  socket.on('loginRes',(data)=>{
    console.log("login: ",data);
  });
  
  socket.on('registerRes',(data)=>{
    console.log("register: ",data);
  });

  socket.on('irrigationRes',(data)=>{
    console.log("irrigation: ",data);
  });

  socket.on('systemRes',(data)=>{
    console.log("system: ",data);
  });

  const handleSelectFile=(e)=>{
    setNameFile(e.target.files[0].name);
    setFile(e.target.files[0]);
    console.log(file);
    console.log(nameFile);
  }
  const handleinit=(e)=>{
    axios.get("http://3.133.125.251:8080/rabbit/init")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});

    console.log("init")
  }

  const handleLogin=(e)=>{
    const form={
      email: "ramosproque@gmail.com",
      password: "Joni280303zx"
    }
    socket.emit('login', form);
    console.log("login enviado")

    
    socket.on("loginRes", async (form) => {
      const object=form;
    });
  }
  
  const handleSystemAsk=(e)=>{
    const id_user=2;
    socket.emit('systemAsk', id_user);
    console.log("hecho la peticion de sistema")
  }
  
  const handleIrrigationAsk=(e)=>{
    const id_system=3;
    socket.emit('irrigationAsk', id_system);
    console.log("hecho la peticion de riego")
  }


  const handleIrrigationCreate=(e)=>{
    const id_system=3;
    axios.post(`http://3.133.125.251:8080/irrigation/create/83/20/${id_system}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log("hecho la creacion de riegos")
  }
  
  const handleSystemCreate=(e)=>{
    const idUser=2;
    axios.post('http://3.133.125.251:8080/system/create', {
      model:"esp32-u2",
      userId: idUser
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    console.log("hecho la creacion de sistma")
  }

  const handleReg=(e)=>{
   const form={
      name: "Jonathan",
      email: "ramosproque2@gmail.com",
      password: "Joni280303zx"
   }
   socket.emit('regUser', form);

   socket.on('regResponse', ()=>{})
  }
  
  
  return (
    <>
    <div>
      <button id="init" onClick={handleinit} className="w-full h-auto p-2 bg-pink-500 my-2 rounded-lg text-2xl">Initial-Event</button>
    </div>
    <div>
      <button id="login" onClick={handleLogin} className="w-full h-auto p-2 bg-pink-500 my-2 rounded-lg text-2xl">Login</button>
    </div>
    <div>
      <button id="systemAsk" onClick={handleSystemAsk} className="w-full h-auto p-2 bg-pink-500 my-2 rounded-lg text-2xl">System pedir</button>
    </div>
    <div>
      <button id="irrigationAsk" onClick={handleIrrigationAsk} className="w-full h-auto p-2 bg-pink-500 my-2 rounded-lg text-2xl">Irrigation pedir</button>
    </div>
    <div>
      <button id="reg" onClick={handleReg} className="w-full h-auto p-2 bg-pink-500 my-2 rounded-lg text-2xl">Registro_USER</button>
    </div>
    <div>
      <button id="ESC" onClick={handleSystemCreate} className="w-full h-auto p-2 bg-pink-500 my-2 rounded-lg text-2xl">E-system-Create</button>
    </div>
    <div>
      <button id="EIC" onClick={handleIrrigationCreate} className="w-full h-auto p-2 bg-pink-500 my-2 rounded-lg text-2xl">E-Irrigation-Create</button>
    </div>
    </>
  )
}

export default App
