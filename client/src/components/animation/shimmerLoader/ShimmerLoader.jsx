import React from 'react';
import './ShimmerLoader.scss';
import LoaderVerify from '../../loaders/LoaderVerify';

const ShimmerLoader = () => {
    return (
        <div className="shimmer-loader">
            <div className="header">
                <div className="logo shimmer"></div>
                <div className="nav">
                    <div className="nav-item shimmer"></div>
                    <div className="nav-item shimmer"></div>
                    <div className="nav-item shimmer"></div>
                    <div className="nav-item shimmer"></div>
                    <div className="logout shimmer"></div>
                </div>
            </div>

            <div className="hero shimmer-text shimmer"></div>
            <div className="sub-hero shimmer-text shimmer"><LoaderVerify verify="Please wait we'r setting up " /></div>

            <div className="toggle-row">
                <div className="toggle shimmer"></div>
                <div className="toggle shimmer"></div>
                <div className="toggle shimmer"></div>
                <div className="toggle shimmer"></div>
                <div className="toggle shimmer"></div>
            </div>

            <div className="text-area shimmer"></div>

            <div className="buttons">
                <div className="btn shimmer"></div>
                <div className="btn shimmer"></div>
                <div className="btn shimmer"></div>
            </div>
        </div>
    );
};

export default ShimmerLoader;
