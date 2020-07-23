import Captcha from '../cap/index';
import { text, setEnv } from '../cap/config';
import { getScreenWidth } from '../cap/platform/element';
import { setInstance } from '../../data';
Component({
    properties: {
        env: {
            type: String,
            value: '',
        },
        uid: {
            type: Number,
            value: 0,
        },
        bpid: {
            type: Number,
            value: 0,
        },
    },
    data: {
        text: text,
        show: false,
        padding: 25,
        showFoot: true,
        showTip: false,
        showSliderTip: true,
        renderType: null,
        lineWidth: 0,
        blockFootLeft: 0,
        imgBlockLeft: 0,
        imgBlockWidth: 0,
        tipClassName: '',
        tip: '',
    },
    methods: {
        moveStart: function () { },
        move: function () { },
        moveEnd: function () { },
        refresh: function () { },
        close: function () { },
        clickTip: function () { },
        showTip: function (tipClassName, tip) {
            this.setData({
                tipClassName: tipClassName,
                tip: tip,
                showFoot: false,
                showTip: true,
            });
        },
        renderWrapper: function () {
            this.setData({
                renderType: 'base',
            });
        },
        renderSlider: function () {
            this.setData({
                renderType: 'slider',
            });
        },
    },
    lifetimes: {
        attached: function () {
            var that = this;
            var _a = this.props || this.data, uid = _a.uid, bpid = _a.bpid, env = _a.env;
            if (env) {
                setEnv(env);
            }
            if (env !== 'production' && (!bpid)) {
                throw new Error('bpid is required');
            }
            var item = new Captcha({
                uid: uid || '',
                bpId: bpid,
                rootWidth: getScreenWidth() - that.data.padding * 2,
            }, {
                renderWrapper: function (error) {
                    that.setData({
                        renderType: 'base',
                        error: error || '',
                        tipClassName: '',
                        showTip: false,
                        showSliderTip: true,
                        lineWidth: 0,
                        blockFootLeft: 0,
                    });
                },
                renderSlider: function (blockSrc, mainImgSrc, imgBlockLeft, imgBlockWidth) {
                    that.setData({
                        imgBlockLeft: imgBlockLeft,
                        blockSrc: blockSrc,
                        mainImgSrc: mainImgSrc,
                        imgBlockWidth: imgBlockWidth,
                        renderType: 'slider',
                        showFoot: true,
                    });
                },
                hideTipTxt: function () {
                    that.setData({
                        showSliderTip: false,
                    });
                },
                setLineWidth: function (x) {
                    that.setData({
                        lineWidth: x,
                    });
                },
                setSliderPosi: function (x, imgX) {
                    that.setData({
                        blockFootLeft: x,
                        imgBlockLeft: imgX,
                    });
                },
                showError: function (tooMany) {
                    if (tooMany) {
                        that.showTip('__xmca-error', text.errorTooMany);
                    }
                    else {
                        that.setData({
                            tipClassName: '__xmca-error',
                        });
                    }
                },
                showLoading: function () {
                    that.showTip('__xmca-loading', text.loading);
                },
                showSuccess: function () {
                    that.showTip('__xmca-success', text.checkingSuccess);
                },
                showLoadingError: function (msg) {
                    that.showTip('__xmca-error', msg || text.loadingErr);
                },
                /** EVENT **/
                onMove: function (move) {
                    that.move = move;
                },
                onMoveStart: function (moveStart) {
                    that.moveStart = moveStart;
                },
                onMoveEnd: function (moveEnd) {
                    that.moveEnd = moveEnd;
                },
                onRefresh: function (refresh) {
                    that.refresh = refresh;
                },
                onClose: function (close) {
                    that.close = close;
                },
                onClickTip: function (clickTip) {
                    that.clickTip = function (e) {
                        var _a = that.data, error = _a.error, tipClassName = _a.tipClassName;
                        if (error || /error/.test(tipClassName)) {
                            clickTip(e);
                        }
                    };
                },
            });
            item.on('success', function () {
                that.setData({
                    show: false,
                });
            });
            item.on('close', function () {
                that.setData({
                    renderType: null,
                    show: false,
                });
            });
            var oldFunc = item.start.bind(item);
            item.start = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                oldFunc.apply(void 0, args);
            };
            item.on('beforeRender', function () {
                that.setData({
                    show: true,
                });
            });
            setInstance(item);
            that.triggerEvent('init', item);
        },
    },
});
