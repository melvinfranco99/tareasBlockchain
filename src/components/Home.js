import React, { Component } from 'react';
import Web3 from 'web3';
import TareaContrato from '../abis/TareaContrato.json'

import Navigation from './Navbar';

class App extends Component {

  async componentDidMount() {
    // 1. Carga de Web3
    await this.loadWeb3()
    // 2. Carga de datos de la Blockchain
    await this.loadBlockchainData()
  }

  // 1. Carga de Web3
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Accounts: ', accounts)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('¡Deberías considerar usar Metamask!')
    }
  }

  // 2. Carga de datos de la Blockchain
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Ganache -> 5777, Rinkeby -> 4, BSC -> 97
    const networkId = await web3.eth.net.getId()
    console.log('networkid:', networkId)

    const tareasContratoData = TareaContrato.networks[5777]
    if(tareasContratoData){
      const tareasContrato = new web3.eth.Contract(TareaContrato.abi, tareasContratoData.address)
      this.setState({tareasContrato: tareasContrato })
      let tarea = await tareasContrato.methods.dameTareas().call()
      this.setState({tarea: tarea})
      console.log(tarea)
    }else{
      alert("El contrato tareaData no se ha desplegado correctamente")
    }

    //Cambiar a partir de aqui
    /*
    const networkData = smart_contract.networks[networkId]
    console.log('NetworkData:', networkData)

    if (networkData) {
      const abi = smart_contract.abi
      console.log('abi', abi)
      const address = networkData.address
      console.log('address:', address)
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
    } else {
      window.alert('¡El Smart Contract no se ha desplegado en la red!')
    }*/
  }

  async agregarTarea(_tarea){
    try{
      const tareasContrato = this.state.tareasContrato
      await tareasContrato.methods.agregarTarea(_tarea).send({from: this.state.account})
    }catch{
      alert("Ha ocurrido un error")
    }
    
  }

  

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      loading: true,
      tareasContrato: {},
      tarea: []
    }
  }

  render() {
    return (
      <div>
        <Navigation account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto card">
                <span>{this.state.tareaLista}</span>
                <form onSubmit={async (e) => {
                  e.preventDefault()

                  let tarea = this.tarea.value

                  await this.agregarTarea(tarea)
                }}>
                  <input
                  ref={(tarea) => {this.tarea = tarea}}
                  placeholder='tarea...'
                  required
                  /><br></br><br></br>
                  <button type='submit' className='btn btn-success'>Agregar tarea</button>
                </form>
              </div>
              <div className="content mr-auto ml-auto card">
                {this.state.tarea.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
