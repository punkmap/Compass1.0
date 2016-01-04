/*! Terraformer JS - 0.0.1 - 2013-10-05
*   https://github.com/esri/Terraformer
*   Copyright (c) 2013 Environmental Systems Research Institute, Inc.
*   Licensed MIT */!function(a,b){"object"==typeof module&&"object"==typeof module.exports&&(exports=module.exports=b()),"object"==typeof window&&(a.Terraformer=b())}(this,function(){function a(){var a=Array.prototype.slice.apply(arguments);void 0!==typeof console&&console.warn&&console.warn.apply(console,a)}function b(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function c(a){if(a.type)switch(a.type){case"Point":return[a.coordinates[0],a.coordinates[1],a.coordinates[0],a.coordinates[1]];case"MultiPoint":return f(a.coordinates);case"LineString":return f(a.coordinates);case"MultiLineString":return d(a.coordinates);case"Polygon":return d(a.coordinates);case"MultiPolygon":return e(a.coordinates);case"Feature":return a.geometry?c(a.geometry):null;case"FeatureCollection":return g(a);case"GeometryCollection":return h(a);default:throw new Error("Unknown type: "+a.type)}return null}function d(a){for(var b=null,c=null,d=null,e=null,f=0;f<a.length;f++)for(var g=a[f],h=0;h<g.length;h++){var i=g[h],j=i[0],k=i[1];null===b?b=j:b>j&&(b=j),null===c?c=j:j>c&&(c=j),null===d?d=k:d>k&&(d=k),null===e?e=k:k>e&&(e=k)}return[b,d,c,e]}function e(a){for(var b=null,c=null,d=null,e=null,f=0;f<a.length;f++)for(var g=a[f],h=0;h<g.length;h++)for(var i=g[h],j=0;j<i.length;j++){var k=i[j],l=k[0],m=k[1];null===b?b=l:b>l&&(b=l),null===c?c=l:l>c&&(c=l),null===d?d=m:d>m&&(d=m),null===e?e=m:m>e&&(e=m)}return[b,d,c,e]}function f(a){for(var b=null,c=null,d=null,e=null,f=0;f<a.length;f++){var g=a[f],h=g[0],i=g[1];null===b?b=h:b>h&&(b=h),null===c?c=h:h>c&&(c=h),null===d?d=i:d>i&&(d=i),null===e?e=i:i>e&&(e=i)}return[b,d,c,e]}function g(a){for(var b,d=[],e=a.features.length-1;e>=0;e--)b=c(a.features[e].geometry),d.push([b[0],b[1]]),d.push([b[2],b[3]]);return f(d)}function h(a){for(var b,d=[],e=a.geometries.length-1;e>=0;e--)b=c(a.geometries[e]),d.push([b[0],b[1]]),d.push([b[2],b[3]]);return f(d)}function i(a){var b=c(a);return{x:b[0],y:b[1],w:Math.abs(b[0]-b[2]),h:Math.abs(b[1]-b[3])}}function k(a){return a*Y}function l(a){return a*Z}function m(a,b){for(var c=0;c<a.length;c++)"number"==typeof a[c][0]&&(a[c]=b(a[c])),"object"==typeof a[c]&&(a[c]=m(a[c],b));return a}function n(a){var b=a[0],c=a[1];return[k(b/X)-360*Math.floor((k(b/X)+180)/360),k(Math.PI/2-2*Math.atan(Math.exp(-1*c/X)))]}function o(a){var b=a[0],c=Math.max(Math.min(a[1],89.99999),-89.99999);return[l(b)*X,X/2*Math.log((1+Math.sin(l(c)))/(1-Math.sin(l(c))))]}function p(a,b,c){if("Point"===a.type)a.coordinates=b(a.coordinates);else if("Feature"===a.type)a.geometry=p(a.geometry,b,!0);else if("FeatureCollection"===a.type)for(var d=0;d<a.features.length;d++)a.features[d]=p(a.features[d],b,!0);else if("GeometryCollection"===a.type)for(var e=0;e<a.geometries.length;e++)a.geometries[e]=p(a.geometries[e],b,!0);else a.coordinates=m(a.coordinates,b);return c||b===o&&(a.crs=$),b===n&&delete a.crs,a}function q(a){return p(a,o)}function r(a){return p(a,n)}function s(a,b){return b>a?-1:a>b?1:0}function t(a,b){return a[0]-b[0]>a[1]-b[1]?1:a[0]-b[0]<a[1]-b[1]?-1:0}function u(a,b,c){return s((b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]),0)}function v(a,b){var c=b[0]-a[0],d=b[1]-a[1];return c*c+d*d}function w(a,b){var c=b;for(var d in a){var e=u(b,c,a[d]);(-1===e||0===e&&v(b,a[d])>v(b,c))&&(c=a[d])}return c}function x(a){if(0===a.length)return[];if(1===a.length)return a;for(var b=[a.sort(t)[0]],c=0;c<b.length;c++){var d=w(a,b[c]);d!==b[0]&&b.push(d)}return b}function y(a,b){for(var c=!1,d=-1,e=a.length,f=e-1;++d<e;f=d)(a[d][1]<=b[1]&&b[1]<a[f][1]||a[f][1]<=b[1]&&b[1]<a[d][1])&&b[0]<(a[f][0]-a[d][0])*(b[1]-a[d][1])/(a[f][1]-a[d][1])+a[d][0]&&(c=!c);return c}function z(a,b){if(a&&a.length){if(1===a.length)return y(a[0],b);if(y(a[0],b)){for(var c=1;c<a.length;c++)if(y(a[c],b))return!1;return!0}return!1}return!1}function A(a,b,c,d){var e=(d[0]-c[0])*(a[1]-c[1])-(d[1]-c[1])*(a[0]-c[0]),f=(b[0]-a[0])*(a[1]-c[1])-(b[1]-a[1])*(a[0]-c[0]),g=(d[1]-c[1])*(b[0]-a[0])-(d[0]-c[0])*(b[1]-a[1]);if(0!==g){var h=e/g,i=f/g;if(h>=0&&1>=h&&i>=0&&1>=i)return!0}return!1}function B(a,b){for(var c=0;c<a.length-1;c++)for(var d=0;d<b.length-1;d++)if(A(a[c],a[c+1],b[d],b[d+1]))return!0;return!1}function C(a,b){for(var c=0;c<b.length;c++)for(var d=b[c],e=0;e<d.length-1;e++)for(var f=0;f<a.length-1;f++)if(A(d[e],d[e+1],a[f],a[f+1]))return!0;return!1}function D(a,b){for(var c=0;c<a.length;c++)if(C(a[c],b))return!0;return!1}function E(a,b){for(var c=0;c<b.length;c++)return C(a,b[c])?!0:!1}function F(a,b){for(var c=0;c<a.length;c++)return E(a[c],b)?!0:!1}function G(a,b){for(var c=0;c<a.length;c++)return F(a[c],b)?!0:!1}function H(a){for(var b=[],c=0;c<a.length;c++){var d=a[c].slice();I(d[0],d[d.length-1])===!1&&d.push(d[0]),b.push(d)}return b}function I(a,b){for(var c=0;c<a.length;c++)for(var d=0;d<b.length;d++)if(a[c]!==b[d])return!1;return!0}function J(a,b){if(a.length!==b.length)return!1;for(var c=a.slice().sort(t),d=b.slice().sort(t),e=0;e<c.length;e++){if(c[e].length!==d[e].length)return!1;for(var f=0;f<c.length;f++)if(c[e][f]!==d[e][f])return!1}return!0}function K(a){if(a)switch(a.type){case"Point":return new L(a);case"MultiPoint":return new M(a);case"LineString":return new N(a);case"MultiLineString":return new O(a);case"Polygon":return new P(a);case"MultiPolygon":return new Q(a);case"Feature":return new R(a);case"FeatureCollection":return new S(a);case"GeometryCollection":return new T(a);default:throw new Error("Unknown type: "+a.type)}}function L(a){var c=Array.prototype.slice.call(arguments);if(a&&"Point"===a.type&&a.coordinates)b(this,a);else if(a&&"[object Array]"===Object.prototype.toString.call(a))this.coordinates=a;else{if(!(c.length>=2))throw"Terraformer: invalid input for Terraformer.Point";this.coordinates=c}this.type="Point"}function M(a){if(a&&"MultiPoint"===a.type&&a.coordinates)b(this,a);else{if(!isArray(a))throw"Terraformer: invalid input for Terraformer.MultiPoint";this.coordinates=a}this.type="MultiPoint"}function N(a){if(a&&"LineString"===a.type&&a.coordinates)b(this,a);else{if(!isArray(a))throw"Terraformer: invalid input for Terraformer.LineString";this.coordinates=a}this.type="LineString"}function O(a){if(a&&"MultiLineString"===a.type&&a.coordinates)b(this,a);else{if(!isArray(a))throw"Terraformer: invalid input for Terraformer.MultiLineString";this.coordinates=a}this.type="MultiLineString"}function P(a){if(a&&"Polygon"===a.type&&a.coordinates)b(this,a);else{if(!isArray(a))throw"Terraformer: invalid input for Terraformer.Polygon";this.coordinates=a}this.type="Polygon"}function Q(a){if(a&&"MultiPolygon"===a.type&&a.coordinates)b(this,a);else{if(!isArray(a))throw"Terraformer: invalid input for Terraformer.MultiPolygon";this.coordinates=a}this.type="MultiPolygon"}function R(a){if(a&&"Feature"===a.type)b(this,a);else{if(!(a&&a.type&&a.coordinates))throw"Terraformer: invalid input for Terraformer.Feature";this.geometry=a}this.type="Feature"}function S(a){if(a&&"FeatureCollection"===a.type&&a.features)b(this,a);else{if(!isArray(a))throw"Terraformer: invalid input for Terraformer.FeatureCollection";this.features=a}this.type="FeatureCollection"}function T(a){if(a&&"GeometryCollection"===a.type&&a.geometries)b(this,a);else if(isArray(a))this.geometries=a;else{if(!a.coordinates||!a.type)throw"Terraformer: invalid input for Terraformer.GeometryCollection";this.type="GeometryCollection",this.geometries=[a]}this.type="GeometryCollection"}function U(a,b,c){for(var d=o(a),e=c||64,f={type:"Polygon",coordinates:[[]]},g=1;e>=g;g++){var h=g*(360/e)*Math.PI/180;f.coordinates[0].push([d[0]+b*Math.cos(h),d[1]+b*Math.sin(h)])}return r(f)}function V(a,c,d){var e=d||64,f=c||250;if(!a||a.length<2||!f||!e)throw new Error("Terraformer: missing parameter for Terraformer.Circle");b(this,new R({type:"Feature",geometry:U(a,f,e),properties:{radius:f,center:a,steps:e}}))}var W={},X=6378137,Y=57.29577951308232,Z=.017453292519943,$={type:"link",properties:{href:"http://spatialreference.org/ref/sr-org/6928/ogcwkt/",type:"ogcwkt"}},_={type:"link",properties:{href:"http://spatialreference.org/ref/epsg/4326/ogcwkt/",type:"ogcwkt"}};isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)};var ab=["length"];return K.prototype.toMercator=function(){return q(this)},K.prototype.toGeographic=function(){return r(this)},K.prototype.envelope=function(){return i(this)},K.prototype.bbox=function(){return c(this)},K.prototype.convexHull=function(){var a,b,c=[];if("Point"===this.type)return this.coordinates&&this.coordinates.length>0?[this.coordinates]:[];if("LineString"===this.type||"MultiPoint"===this.type){if(!(this.coordinates&&this.coordinates.length>0))return[];c=this.coordinates}else if("Polygon"===this.type||"MultiLineString"===this.type){if(!(this.coordinates&&this.coordinates.length>0))return[];for(a=0;a<this.coordinates.length;a++)c=c.concat(this.coordinates[a])}else{if("MultiPolygon"!==this.type)throw new Error("Unable to get convex hull of "+this.type);if(!(this.coordinates&&this.coordinates.length>0))return[];for(a=0;a<this.coordinates.length;a++)for(b=0;b<this.coordinates[a].length;b++)c=c.concat(this.coordinates[a][b])}return x(c)},K.prototype.toJSON=function(){var a={};for(var b in this)this.hasOwnProperty(b)&&-1===ab.indexOf(b)&&(a[b]=this[b]);return a.bbox=c(this),a},K.prototype.within=function(a){var b,c,d;if("Point"===a.type&&"Point"===this.type)return I(this.coordinates,a.coordinates);if("MultiLineString"===a.type&&"Point"===this.type)for(c=0;c<a.coordinates.length;c++){var e={type:"LineString",coordinates:a.coordinates[c]};if(this.within(e))return!0}if(("LineString"===a.type||"MultiPoint"===a.type)&&"Point"===this.type)for(c=0;c<a.coordinates.length;c++){if(this.coordinates.length!==a.coordinates[c].length)return!1;if(I(this.coordinates,a.coordinates[c]))return!0}if("Polygon"===a.type){if("Polygon"===this.type){if(a.coordinates.length===this.coordinates.length)for(c=0;c<this.coordinates.length;c++)if(J(this.coordinates[c],a.coordinates[c]))return!0;return this.coordinates.length&&z(a.coordinates,this.coordinates[0][0])?!D(H(this.coordinates),H(a.coordinates)):!1}if("Point"===this.type)return z(a.coordinates,this.coordinates);if("LineString"===this.type||"MultiPoint"===this.type){if(!this.coordinates||0===this.coordinates.length)return!1;for(c=0;c<this.coordinates.length;c++)if(z(a.coordinates,this.coordinates[c])===!1)return!1;return!0}if("MultiLineString"===this.type){for(c=0;c<this.coordinates.length;c++){var f=new N(this.coordinates[c]);if(f.within(a)===!1)return d++,!1}return!0}if("MultiPolygon"===this.type){for(c=0;c<this.coordinates.length;c++){var g=new K({type:"Polygon",coordinates:this.coordinates[c]});if(g.within(a)===!1)return!1}return!0}}if("MultiPolygon"===a.type){if("Point"===this.type){if(a.coordinates.length)for(c=0;c<a.coordinates.length;c++)if(b=a.coordinates[c],z(b,this.coordinates)&&D(this.coordinates,a.coordinates)===!1)return!0;return!1}if("Polygon"===this.type){for(c=0;c<this.coordinates.length;c++)if(a.coordinates[c].length===this.coordinates.length)for(j=0;j<this.coordinates.length;j++)if(J(this.coordinates[j],a.coordinates[c][j]))return!0;if(F(this.coordinates,a.coordinates)===!1&&a.coordinates.length){for(c=0;c<a.coordinates.length;c++)b=a.coordinates[c],d=z(b,this.coordinates[0][0])===!1?!1:!0;return d}}else if("LineString"===this.type||"MultiPoint"===this.type)for(c=0;c<a.coordinates.length;c++){var h={type:"Polygon",coordinates:a.coordinates[c]};return this.within(h)?!0:!1}else{if("MultiLineString"===this.type){for(c=0;c<this.coordinates.length;c++){var i=new N(this.coordinates[c]);if(i.within(a)===!1)return!1}return!0}if("MultiPolygon"===this.type){for(c=0;c<a.coordinates.length;c++){var k={type:"Polygon",coordinates:a.coordinates[c]};if(this.within(k)===!1)return!1}return!0}}}return!1},K.prototype.intersects=function(b){"Feature"===b.type&&(b=b.geometry);var c=new K(b);if(this.within(b)||c.within(this))return!0;if("LineString"===this.type){if("LineString"===b.type)return B(this.coordinates,b.coordinates);if("MultiLineString"===b.type)return C(this.coordinates,b.coordinates);if("Polygon"===b.type)return C(this.coordinates,H(b.coordinates));if("MultiPolygon"===b.type)return E(this.coordinates,b.coordinates)}else if("MultiLineString"===this.type){if("LineString"===b.type)return C(b.coordinates,this.coordinates);if("Polygon"===b.type||"MultiLineString"===b.type)return D(this.coordinates,b.coordinates);if("MultiPolygon"===b.type)return F(this.coordinates,b.coordinates)}else if("Polygon"===this.type){if("LineString"===b.type)return C(b.coordinates,H(this.coordinates));if("MultiLineString"===b.type)return D(H(this.coordinates),b.coordinates);if("Polygon"===b.type)return D(H(this.coordinates),H(b.coordinates));if("MultiPolygon"===b.type)return F(H(this.coordinates),b.coordinates)}else if("MultiPolygon"===this.type){if("LineString"===b.type)return E(b.coordinates,this.coordinates);if("Polygon"===b.type||"MultiLineString"===b.type)return F(H(b.coordinates),this.coordinates);if("MultiPolygon"===b.type)return G(this.coordinates,b.coordinates)}else if("Feature"===this.type){var d=new K(this.geometry);return d.intersects(b)}return a("Type "+this.type+" to "+b.type+" intersection is not supported by intersects"),!1},L.prototype=new K,L.prototype.constructor=L,M.prototype=new K,M.prototype.constructor=M,M.prototype.forEach=function(a){for(var b=0;b<this.coordinates.length;b++)a.apply(this,[this.coordinates[b],b,this.coordinates]);return this},M.prototype.addPoint=function(a){return this.coordinates.push(a),this},M.prototype.insertPoint=function(a,b){return this.coordinates.splice(b,0,a),this},M.prototype.removePoint=function(a){return"number"==typeof a?this.coordinates.splice(a,1):this.coordinates.splice(this.coordinates.indexOf(a),1),this},M.prototype.get=function(a){return new L(this.coordinates[a])},N.prototype=new K,N.prototype.constructor=N,N.prototype.addVertex=function(a){return this.coordinates.push(a),this},N.prototype.insertVertex=function(a,b){return this.coordinates.splice(b,0,a),this},N.prototype.removeVertex=function(a){return this.coordinates.splice(a,1),this},O.prototype=new K,O.prototype.constructor=O,O.prototype.forEach=function(a){for(var b=0;b<this.coordinates.length;b++)a.apply(this,[this.coordinates[b],b,this.coordinates])},O.prototype.get=function(a){return new N(this.coordinates[a])},P.prototype=new K,P.prototype.constructor=P,P.prototype.addVertex=function(a){return this.coordinates[0].push(a),this},P.prototype.insertVertex=function(a,b){return this.coordinates[0].splice(b,0,a),this},P.prototype.removeVertex=function(a){return this.coordinates[0].splice(a,1),this},P.prototype.close=function(){this.coordinates=H(this.coordinates)},Q.prototype=new K,Q.prototype.constructor=Q,Q.prototype.forEach=function(a){for(var b=0;b<this.coordinates.length;b++)a.apply(this,[this.coordinates[b],b,this.coordinates])},Q.prototype.get=function(a){return new P(this.coordinates[a])},R.prototype=new K,R.prototype.constructor=R,S.prototype=new K,S.prototype.constructor=S,S.prototype.forEach=function(a){for(var b=0;b<this.features.length;b++)a.apply(this,[this.features[b],b,this.features])},S.prototype.get=function(a){var b;return this.forEach(function(c){c.id===a&&(b=c)}),new R(b)},T.prototype=new K,T.prototype.constructor=T,T.prototype.forEach=function(a){for(var b=0;b<this.geometries.length;b++)a.apply(this,[this.geometries[b],b,this.geometries])},T.prototype.get=function(a){return new K(this.geometries[a])},V.prototype=new K,V.prototype.constructor=V,V.prototype.recalculate=function(){return this.geometry=U(this.properties.center,this.properties.radius,this.properties.steps),this},V.prototype.center=function(a){return a&&(this.properties.center=a,this.recalculate()),this.properties.center},V.prototype.radius=function(a){return a&&(this.properties.radius=a,this.recalculate()),this.properties.radius},V.prototype.steps=function(a){return a&&(this.properties.steps=a,this.recalculate()),this.properties.steps},V.prototype.toJSON=function(){var a=K.prototype.toJSON.call(this);return a},W.Primitive=K,W.Point=L,W.MultiPoint=M,W.LineString=N,W.MultiLineString=O,W.Polygon=P,W.MultiPolygon=Q,W.Feature=R,W.FeatureCollection=S,W.GeometryCollection=T,W.Circle=V,W.toMercator=q,W.toGeographic=r,W.Tools={},W.Tools.positionToMercator=o,W.Tools.positionToGeographic=n,W.Tools.applyConverter=p,W.Tools.toMercator=q,W.Tools.toGeographic=r,W.Tools.createCircle=U,W.Tools.calculateBounds=c,W.Tools.calculateEnvelope=i,W.Tools.coordinatesContainPoint=y,W.Tools.polygonContainsPoint=z,W.Tools.arrayIntersectsArray=B,W.Tools.coordinatesContainPoint=y,W.Tools.coordinatesEqual=J,W.Tools.convexHull=x,W.MercatorCRS=$,W.GeographicCRS=_,W});