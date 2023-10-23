import React from 'react';
import '../css/herobanner.css';

export default function HeroBanner() {
  return (
    <>
      <svg
        id="hero"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1200 310"
        style={{enableBackground: "new 0 0 1200 310" }}
        preserveAspectRatio="xMinYMin slice"
      >
        <defs>
          <filter id="f1" x="0" y="0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
          <linearGradient id="GRAD_OVERLAY" gradientUnits="userSpaceOnUse" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0" style={{stopColor:'#000000', stopOpacity: '0.40'}} />
            <stop offset="1" style={{stopColor:'#000000', stopOpacity: '0.00'}} />
          </linearGradient>
          <linearGradient id="GRAD_1">
            <stop offset="0" style={{stopColor:'#FFFFFF', stopOpacity: '0.30'}} />
            <stop offset="1" style={{stopColor:'#FFFFFF', stopOpacity: '0.00'}} />
          </linearGradient>
          <linearGradient id="GRAD_2" x1="0" y1="1" y2="0" x2="1">
            <stop offset="0" style={{stopColor:'#FFFFFF', stopOpacity: '0.00'}} />
            <stop offset="1" style={{stopColor:'#FFFFFF', stopOpacity: '0.20'}} />
          </linearGradient>
          <linearGradient id="GRAD_3">
            <stop offset="0" style={{stopColor:'#FFFFFF', stopOpacity: '0.00'}} />
            <stop offset="1" style={{stopColor:'#FFFFFF', stopOpacity: '0.20'}} />
          </linearGradient>
          <linearGradient id="GRAD_4" y2="1" x2="1">
            <stop offset="0" style={{stopColor:'#FFFFFF', stopOpacity: '0.00'}} />
            <stop offset="1" style={{stopColor:'#FFFFFF', stopOpacity: '0.20'}} />
          </linearGradient>
        </defs>
        <g id="background">
          <rect y="-1" className="st1" width="1200" height="312" />
          <rect y="0" className="st0" width="1200" height="312" />
        </g>
        <g id="graphic">
          <polygon className="st1" points="848.875,311 310.808,311 579.841,-25.535" />
          <polygon className="st2" points="0,-1 0,311 42.081,311 293.299,-1" />
          <polygon className="st3" points="310.807,311 0,311 -0.346,-67.654" />
        </g>
        <g id="line">
          <polyline
            className="st4"
            points="1054.599,310.25 832.676,30.608 610.333,310.25 761.278,310.25 611.459,121.124 461.785,310.25"
          />
          <polyline
            className="st5"
            points="1054.599,310.25 832.676,30.608 610.333,310.25 761.278,310.25 611.459,121.124 461.785,310.25"
          />
          <polyline
            className="st6"
            points="1054.599,310.25 832.676,30.608 610.333,310.25 761.278,310.25 611.459,121.124 461.785,310.25"
          />
        </g>
      </svg>
    </>
  );
}
