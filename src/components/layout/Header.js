import React, { useState, useEffect }  from 'react';
import { connect } from "react-redux";
import { Link, useHistory , useLocation } from 'react-router-dom';
import Web3 from "web3"
import {isMobile} from 'react-device-detect';
import { useWallet, UseWalletProvider, ConnectionRejectedError } from 'use-wallet';
import TokenAmount from 'token-amount'
import Swal from 'sweetalert2'
import queryString from 'query-string'

import WalletConnectProvider from "@walletconnect/web3-provider";

import { actionSetUserData, actionSetInviteID } from "../../actions/walletAction";
import { CHAINMAINID, BscNetWork } from '../../helper/ABI';
import {Truncate } from "../../helper/Helper";

import {SendApiConnectWallet} from "../../utils/walletsService"

const Header = (props) => {
    // const web3 = new Web3(Web3.givenProvider || BscNetWork.rpcUrls[0]);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    
    const wallet = useWallet();
    const location = useLocation();
    const history = useHistory();

    const [respNav, setRespNav] = useState("");
    const [selWallet, setSelWallet] = useState("noConn");
    const [totalSupply, setTotalSupply] = useState(0);
    const [userDNDAmt ,setUserDNDAmt] = useState(null);

    const getAccount = async() => {
        if ( wallet.status === "connected" ) {
            console.log("connector    "  +  wallet.connector );
            
            SendApiConnectWallet( wallet.account, wallet.connector )
            .then( async(res)=>{
                console.log("SendApiConnectWallet -----------------");
                console.log(res.data);
                if (res.data.success && res.data.success === "error"){
                    // console.log("Server error");
                } else {
                    props.StoreUserData(res.data.data);
                    console.log("saved userdata to store");
                }
            }).catch(err=>{
                console.log("erro-----------------" + err);
            });
        }
    }

    useEffect( () => {
        const values = queryString.parse(location.search);
        if ( values.id){
            props.setInviteID(values.id);
        }
    },[0]);
  
    useEffect(()=>{
        console.log(wallet);
        if ( wallet.error?.name ) {
            var error = (wallet.error instanceof ConnectionRejectedError
                ? 'Connection error: the user rejected the activation'
                : "You need to choose BSC Main Network");
            
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: error,
                confirmButtonText: 'Go to home',
            }).then (()=>{
                history.push("/");
                wallet.reset()
            })
            return
        }
        if ( wallet.status === "connected" ) getAccount();
        else if ( wallet.status === "disconnected" ) wallet.reset();

    },[wallet.status, wallet.error?.name]);

    const CheckProvider = ()=>{
        console.log('checker web3');
        console.log(web3);
        if (typeof web3 === 'undefined') {
            Swal.fire("Please Install MetaMask.", "", "info");
            return false;
        }
        return true;
    }
    const openMetaMaskEvent = async () => {
        if ( CheckProvider() === false ) return;

        setSelWallet("injected");
        // const chainIdHex = web3.currentProvider.chainId;
        const chainIdDec = await web3.eth.getChainId();
        // console.log(chainIdHex);
       
        console.log(chainIdDec + "here");
        console.log(Web3.givenProvider);
        console.log(chainIdDec);
        if ( chainIdDec !== CHAINMAINID ){
            web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: `0x${CHAINMAINID.toString(16)}`}]
            }).then (()=>{
                wallet.connect("injected");
            }).catch (error => {
                console.log(error);
                if ( error.code === 4902){
                    web3.currentProvider.request({
                        method: "wallet_addEthereumChain",
                        params: [ BscNetWork ],
                    }).then((res)=>{
                        wallet.connect("injected");
                    }).catch(err=>{
                        Swal.fire({
                            icon: "error",
                            title: "Add BSC NetWork",
                            text: "User rejected the request.",
                            confirmButtonText: 'I know',
                        }). then(()=>{
                            history.push("/");
                        })
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Add BSC NetWork",
                        text: "User rejected the request.",
                        confirmButtonText: 'I know',
                    }). then(()=>{
                        history.push("/");
                    })
                }
            })
        } else {
            wallet.connect("injected");
        }
    }

    const openWalletConnectEvent = async()=>{
        if ( CheckProvider() === false ) return;
        setSelWallet("walletconnect");
        console.log("open walletconnect");
        wallet.connect("walletconnect");
    }

    const disconnectWallet = async() => {
        console.log("----- close Metamask");
        props.StoreUserData({});
        wallet.reset();
        // setSelWallet("noConn");
        // await provider.disconnect()
    }


    return (
        <>
            <header className="top-header nav-fix">
                <div className="container">
                    <nav className="navigation-header d-flex align-items-center justify-content-between justify-content-lg-start">
                        { props.wallet.userdata.address ?
                            
                                <Link to="#connect-wallet" className="logo" onClick={()=>disconnectWallet()} >
                                    <img src="./images/logo.svg" alt="logo" style={{background: "#75fb63", borderRadius: "20px"}}/>
                                </Link> 
                            
                            :
                            <Link to="#connect-wallet" className="logo" data-bs-toggle="modal">
                                <img src="./images/logo.svg" alt="logo" />
                            </Link>
                        }
                        <button type="button" className="btn-toggle-menu d-flex d-lg-none flex-wrap" onClick={() =>setRespNav("opened")}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <ul className="menu d-none d-lg-flex align-items-center">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="pre_sale">Token</Link>
                            </li>
                            <li>
                                <Link to="nft" >NFT</Link>
                            </li>
                            <li>
                                <Link to="stake">Stake</Link>
                            </li>
                            <li>
                                <Link to="airdrop">AirDrop</Link>
                            </li>
                            <li>
                                <Link to="referrals">Referrals</Link>
                            </li>
                            <li>
                                <Link to="roadmap">About</Link>
                            </li>
                        </ul>
                        <div className="dropdown d-none d-lg-block">
                            <button type="button" className="dropdown-toggle dropdown-language" data-bs-toggle="dropdown" id="dropdown-language">
                                <img src="./images/usa.svg" alt="usa" />
                                EN
                            </button>
                            <div aria-labelledby="dropdown-language" className="dropdown-menu">
                                <Link to="#" className="dropdown-item"> USA </Link>
                                <Link to="#" className="dropdown-item"> CHA </Link>
                            </div>
                        </div>
                        { props.wallet.userdata.address  ?
                            <div className="dropdown d-none d-lg-block" style={{marginLeft: "25px"}} >
                                <Link to="#" className="btn-account has-code" id="dropdown-user" data-bs-toggle="dropdown" >
                                    <span>
                                        {Truncate(props.wallet.userdata.address, -1)}
                                        <span> <span className="text-orange">
                                            {
                                                // userDNDAmt
                                                Truncate(userDNDAmt, -18)
                                                // totalSupply
                                                // Truncate(TokenAmount.format(userDNDAmt, 18, {symbol: 'dedo'}), -2)
                                            } 
                                        </span>DND</span>
                                    </span>
                                    <i className="icon-user"></i>
                                </Link> 
                                <div aria-labelledby="dropdown-user" className="dropdown-menu">
                                    <Link to="#" className="dropdown-item" > Add DND </Link>
                                    <Link to="#" className="dropdown-item" onClick={()=>disconnectWallet()} > Disconnect </Link>
                                </div>
                            </div>
                        :  <Link to="#connect-wallet" className="btn-connect-wallet order-lg-4" data-bs-toggle="modal">
                                <img src="./images/wallet-1.png" alt="wallet" /> Connect   
                            </Link>
                        }
                    </nav>
                </div>
            </header>
            
            <div className={`${respNav} navigation-responsive`}>
                <div className="content">
                    <Link to="#" className="logo">
                        <img src="./images/logo-res.png" alt="logo" />
                    </Link>
                    <ul>
                        <li>
                            <Link to="/" onClick={()=> setRespNav("")}>Home</Link>
                        </li>
                        <li>
                            <Link to="pre_sale" onClick={()=> setRespNav("")}>Token</Link>
                        </li>
                        <li>
                            <Link to="nft" onClick={()=> setRespNav("")}>NFT</Link>
                        </li>
                        <li>
                            <Link to="stake" onClick={()=> setRespNav("")}>Stake</Link>
                        </li>
                        <li>
                            <Link to="airdrop" onClick={()=> setRespNav("")}>AirDrop</Link>
                        </li>
                        <li>
                            <Link to="referrals" onClick={()=> setRespNav("")}>Referrals</Link>
                        </li>
                        <li>
                            <Link to="roadmap" onClick={()=> setRespNav("")}>About</Link>
                        </li>
                    </ul>
                    <button type="button" className="close" onClick={()=> setRespNav("")}>
                        <i className="icon-close"></i>
                    </button>
                </div>
            </div>
            

            <div id="connect-wallet" className="modal fade modal-connect-wallet">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h4>Connect <span className="text-orange"> Wallet </span></h4>
                            <p>
                                <label>
                                    <input type="checkbox" name="terms" />
                                    <i></i>
                                    Accept <Link to="#"> Terms of Service </Link> and <Link to="#"> Privacy Policy </Link>
                                </label>
                            </p>
                            <ul className="connections">
                                { !isMobile &&
                                    <li id="connect-metamask" className={`${selWallet==="injected"?"active": ""}`} >
                                        <Link to="#" onClick={()=>openMetaMaskEvent()} data-bs-dismiss="modal">
                                            <img src="./images/connect-wallet-1.png" alt="connect wallet" />
                                            <h5>Metamask</h5>
                                        </Link>
                                    </li> 
                                } 
                                <li id="connect-webwallet" className={`${selWallet==="walletconnect"?"active": ""}`}>
                                    <Link to="#" onClick={()=>openWalletConnectEvent()} data-bs-dismiss="modal">
                                        <img src="./images/connect-wallet-2.png" alt="connect wallet" />
                                        <h5>Web Wallet</h5>
                                    </Link>
                                </li>
                            </ul>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"><i className="icon-close"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <form id="form-connect-metamask" method="POST" action="/connect_wallet">
                <input hidden type="text" id="wallet-address" name="wallet-address" />
            </form>
        
        </>
    )
}

const mapStateToProps = (state) => ({
    ...state
})
const mapDispatchToProps = (dispatch) => ({
    StoreUserData: data => dispatch(actionSetUserData(data)),
    setInviteID: id =>dispatch(actionSetInviteID(id)),
})
export default connect( mapStateToProps, mapDispatchToProps)(Header);