
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract TareaContrato{
    string [] public tareas;

    constructor(){
        tareas.push("desayunar");
        tareas.push("comer");
        tareas.push("cenar");
    }



    function agregarTarea(string memory _nuevaTarea) public{
        tareas.push(_nuevaTarea);
    }

    function dameTareas() public view returns (string [] memory){
        return tareas;
    }

    function eliminar(uint _posicion) public {
        delete tareas[_posicion];
    }

}