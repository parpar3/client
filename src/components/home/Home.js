import React, {useState, useEffect} from 'react'
import { Link  } from 'react-router-dom';
import { connect } from "react-redux";
import Web3 from "web3";

import { actionSetUserData } from "../../actions/walletAction";

export const Home = (props) => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

    const getAccount= async()=>{
        const accounts = await web3.eth.getAccounts();
        if ( !accounts[0] || accounts[0].toLowerCase()!=props.wallet.userdata.address )  
            props.StoreUserData({});
    }

    useEffect( () => {
        getAccount();
    },[0]);

    return(
        <>
            <section className="landing-home">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <div className="content">
                                <h3>The Birth of <span className="text-orange"> Demon Doge! </span></h3>
                                <h6>5000 BNB to lunch</h6>
                                <p>Demon Doge Coin has learned a few tricks and lessons from his meme father, Doge. A new crypto birthed by fans & members of the Doge Coin online community. Baby Doge seeks to impress his father by showing his new improved transaction speeds & adorableness. He is Hyper-deflationary with an integrated smart staking system built in to reward you, so more baby doge coins are being automatically added to your wallet each transaction. Simply Love, pet, and watch your baby doge grow.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2">
                            <div className="presale">
                                <h4 className="presale-title"> Presale  </h4>
                                <div className="presale-body d-flex align-items-center justify-content-between">
                                    <span> 5000 BNB <i>Tokens sold</i></span> 
                                    <div className="presale-body-counter" data-value={`${Math.floor(100*props.sitedata.nft_selled/props.sitedata.nft_totalsupply)}%`}>
                                        <svg>
                                            <circle r="55" cx="60" cy="60" style={{strokeDasharray: `${345*props.sitedata.nft_selled/props.sitedata.nft_totalsupply}, 345`}}/>
                                        </svg>
                                    </div> 
                                    <span>800 BNB<i> Amount Filled  </i></span>
                                </div>
                                <Link to="#"  className="presale-btn btn-default"> 
                                    Start buying <i className="icon-arrow-right"></i> 
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const mapStateToProps = (state) => ({
    ...state
})
const mapDispatchToProps = (dispatch) => ({
    StoreUserData: data => dispatch(actionSetUserData(data)),
})
export default connect( mapStateToProps, mapDispatchToProps)(Home);
