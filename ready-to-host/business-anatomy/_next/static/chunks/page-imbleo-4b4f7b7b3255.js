import {
    r as e
} from "./rolldown-runtime-C60lm6uB.js";
import {
    i as t,
    n,
    r
} from "./framework-D_rUT4EX.js";
var i = e(t(), 1);

function a(e) {
    var t, n, r = ``;
    if (typeof e == `string` || typeof e == `number`) r += e;
    else if (typeof e == `object`)
        if (Array.isArray(e)) {
            var i = e.length;
            for (t = 0; t < i; t++) e[t] && (n = a(e[t])) && (r && (r += ` `), r += n)
        } else
            for (n in e) e[n] && (r && (r += ` `), r += n);
    return r
}

function o() {
    for (var e, t, n = 0, r = ``, i = arguments.length; n < i; n++)(e = arguments[n]) && (t = a(e)) && (r && (r += ` `), r += t);
    return r
}
var s = e => typeof e == `boolean` ? `${e}` : e === 0 ? `0` : e,
    c = o,
    l = (e, t) => n => {
        if (t ?.variants == null) return c(e, n ?.class, n ?.className);
        let {
            variants: r,
            defaultVariants: i
        } = t, a = Object.keys(r).map(e => {
            let t = n ?.[e],
                a = i ?.[e];
            if (t === null) return null;
            let o = s(t) || s(a);
            return r[e][o]
        }), o = n && Object.entries(n).reduce((e, t) => {
            let [n, r] = t;
            return r === void 0 || (e[n] = r), e
        }, {});
        return c(e, a, t ?.compoundVariants ?.reduce((e, t) => {
            let {
                class: n,
                className: r,
                ...a
            } = t;
            return Object.entries(a).every(e => {
                let [t, n] = e;
                return Array.isArray(n) ? n.includes({ ...i,
                    ...o
                }[t]) : { ...i,
                    ...o
                }[t] === n
            }) ? [...e, n, r] : e
        }, []), n ?.class, n ?.className)
    },
    u = Object.defineProperty,
    d = (e, t) => u(e, `name`, {
        value: t,
        configurable: !0
    });

function f(e, t) {
    if (typeof e == `function`) return e(t);
    e != null && (e.current = t)
}
d(f, `setRef`);

function p(...e) {
    return t => {
        let n = !1,
            r = e.map(e => {
                let r = f(e, t);
                return !n && typeof r == `function` && (n = !0), r
            });
        if (n) return () => {
            for (let t = 0; t < r.length; t++) {
                let n = r[t];
                typeof n == `function` ? n() : f(e[t], null)
            }
        }
    }
}
d(p, `composeRefs`);

function m(...e) {
    return i.useCallback(p(...e), e)
}
d(m, `useComposedRefs`);
var h = Object.defineProperty,
    g = (e, t) => h(e, `name`, {
        value: t,
        configurable: !0
    });

function _(e) {
    let t = i.forwardRef((t, n) => {
        let {
            children: r,
            ...a
        } = t, o = null, s = !1, c = [];
        T(r) && typeof ne == `function` && (r = ne(r._payload)), i.Children.forEach(r, e => {
            if (C(e)) {
                s = !0;
                let t = e,
                    n = `child` in t.props ? t.props.child : t.props.children;
                T(n) && typeof ne == `function` && (n = ne(n._payload)), o = b(t, n), c.push(o ?.props ?.children)
            } else c.push(e)
        }), o ? o = i.cloneElement(o, void 0, c) : !s && i.Children.count(r) === 1 && i.isValidElement(r) && (o = r);
        let l = o ? S(o) : void 0,
            u = m(n, l);
        if (!o) {
            if (r || r === 0) throw Error(s ? te(e) : ee(e));
            return r
        }
        let d = x(a, o.props ?? {});
        return o.type !== i.Fragment && (d.ref = n ? u : l), i.cloneElement(o, d)
    });
    return t.displayName = `${e}.Slot`, t
}
g(_, `createSlot`);
var v = Symbol.for(`radix.slottable`);

function y(e) {
    let t = g(e => `child` in e ? e.children(e.child) : e.children, `Slottable`);
    return t.displayName = `${e}.Slottable`, t.__radixId = v, t
}
g(y, `createSlottable`);
var b = g((e, t) => {
    if (`child` in e.props) {
        let t = e.props.child;
        return i.isValidElement(t) ? i.cloneElement(t, void 0, e.props.children(t.props.children)) : null
    }
    return i.isValidElement(t) ? t : null
}, `getSlottableElementFromSlottable`);

function x(e, t) {
    let n = { ...t
    };
    for (let r in t) {
        let i = e[r],
            a = t[r];
        /^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
            let t = a(...e);
            return i(...e), t
        } : i && (n[r] = i) : r === `style` ? n[r] = { ...i,
            ...a
        } : r === `className` && (n[r] = [i, a].filter(Boolean).join(` `))
    }
    return { ...e,
        ...n
    }
}
g(x, `mergeProps`);

function S(e) {
    let t = Object.getOwnPropertyDescriptor(e.props, `ref`) ?.get,
        n = t && `isReactWarning` in t && t.isReactWarning;
    return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, `ref`) ?.get, n = t && `isReactWarning` in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}
g(S, `getElementRef`);

function C(e) {
    return i.isValidElement(e) && typeof e.type == `function` && `__radixId` in e.type && e.type.__radixId === v
}
g(C, `isSlottable`);
var w = Symbol.for(`react.lazy`);

function T(e) {
    return typeof e == `object` && !!e && `$$typeof` in e && e.$$typeof === w && `_payload` in e && E(e._payload)
}
g(T, `isLazyComponent`);

function E(e) {
    return typeof e == `object` && !!e && `then` in e
}
g(E, `isPromiseLike`);
var ee = g(e => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, `createSlotError`),
    te = g(e => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, `createSlottableError`),
    ne = i.use,
    re = e(n(), 1),
    D = r(),
    O = Object.defineProperty,
    ie = (e, t) => O(e, `name`, {
        value: t,
        configurable: !0
    }),
    k = [`a`, `button`, `div`, `form`, `h2`, `h3`, `img`, `input`, `label`, `li`, `nav`, `ol`, `p`, `select`, `span`, `svg`, `ul`].reduce((e, t) => {
        let n = _(`Primitive.${t}`),
            r = i.forwardRef((e, r) => {
                let {
                    asChild: i,
                    ...a
                } = e, o = i ? n : t;
                return window[Symbol.for(`radix-ui`)] = !0, (0, D.jsx)(o, { ...a,
                    ref: r
                })
            });
        return r.displayName = `Primitive.${t}`, { ...e,
            [t]: r
        }
    }, {});

function ae(e, t) {
    e && re.flushSync(() => e.dispatchEvent(t))
}
ie(ae, `dispatchDiscreteCustomEvent`);
var A = Object.defineProperty,
    j = (e, t) => A(e, `name`, {
        value: t,
        configurable: !0
    });

function oe(e, t) {
    let n = i.createContext(t);
    n.displayName = e + `Context`;
    let r = j(e => {
        let {
            children: t,
            ...r
        } = e, a = i.useMemo(() => r, Object.values(r));
        return (0, D.jsx)(n.Provider, {
            value: a,
            children: t
        })
    }, `Provider`);
    r.displayName = e + `Provider`;

    function a(r, a = {}) {
        let {
            optional: o = !1
        } = a, s = i.useContext(n);
        if (s) return s;
        if (t !== void 0) return t;
        if (!o) throw Error(`\`${r}\` must be used within \`${e}\``)
    }
    return j(a, `useContext`), [r, a]
}
j(oe, `createContext`);

function se(e, t = []) {
    let n = [];

    function r(t, r) {
        let a = i.createContext(r);
        a.displayName = t + `Context`;
        let o = n.length;
        n = [...n, r];
        let s = j(t => {
            let {
                scope: n,
                children: r,
                ...s
            } = t, c = n ?.[e] ?.[o] || a, l = i.useMemo(() => s, Object.values(s));
            return (0, D.jsx)(c.Provider, {
                value: l,
                children: r
            })
        }, `Provider`);
        s.displayName = t + `Provider`;

        function c(n, s, c = {}) {
            let {
                optional: l = !1
            } = c, u = s ?.[e] ?.[o] || a, d = i.useContext(u);
            if (d) return d;
            if (r !== void 0) return r;
            if (!l) throw Error(`\`${n}\` must be used within \`${t}\``)
        }
        return j(c, `useContext`), [s, c]
    }
    j(r, `createContext`);
    let a = j(() => {
        let t = n.map(e => i.createContext(e));
        return j(function(n) {
            let r = n ?.[e] || t;
            return i.useMemo(() => ({
                [`__scope${e}`]: { ...n,
                    [e]: r
                }
            }), [n, r])
        }, `useScope`)
    }, `createScope`);
    return a.scopeName = e, [r, ce(a, ...t)]
}
j(se, `createContextScope`);

function ce(...e) {
    let t = e[0];
    if (e.length === 1) return t;
    let n = j(() => {
        let n = e.map(e => ({
            useScope: e(),
            scopeName: e.scopeName
        }));
        return j(function(e) {
            let r = n.reduce((t, {
                useScope: n,
                scopeName: r
            }) => {
                let i = n(e)[`__scope${r}`];
                return { ...t,
                    ...i
                }
            }, {});
            return i.useMemo(() => ({
                [`__scope${t.scopeName}`]: r
            }), [r])
        }, `useComposedScopes`)
    }, `createScope`);
    return n.scopeName = t.scopeName, n
}
j(ce, `composeContextScopes`);
var M = Object.defineProperty,
    N = (e, t) => M(e, `name`, {
        value: t,
        configurable: !0
    });

function le(e, t) {
    if (typeof e == `function`) return e(t);
    e != null && (e.current = t)
}
N(le, `setRef`);

function ue(...e) {
    return t => {
        let n = !1,
            r = e.map(e => {
                let r = le(e, t);
                return !n && typeof r == `function` && (n = !0), r
            });
        if (n) return () => {
            for (let t = 0; t < r.length; t++) {
                let n = r[t];
                typeof n == `function` ? n() : le(e[t], null)
            }
        }
    }
}
N(ue, `composeRefs`);

function P(...e) {
    return i.useCallback(ue(...e), e)
}
N(P, `useComposedRefs`);
var de = Object.defineProperty,
    F = (e, t) => de(e, `name`, {
        value: t,
        configurable: !0
    });

function fe(e) {
    let t = i.forwardRef((t, n) => {
        let {
            children: r,
            ...a
        } = t, o = null, s = !1, c = [];
        be(r) && typeof we == `function` && (r = we(r._payload)), i.Children.forEach(r, e => {
            if (ve(e)) {
                s = !0;
                let t = e,
                    n = `child` in t.props ? t.props.child : t.props.children;
                be(n) && typeof we == `function` && (n = we(n._payload)), o = he(t, n), c.push(o ?.props ?.children)
            } else c.push(e)
        }), o ? o = i.cloneElement(o, void 0, c) : !s && i.Children.count(r) === 1 && i.isValidElement(r) && (o = r);
        let l = o ? _e(o) : void 0,
            u = P(n, l);
        if (!o) {
            if (r || r === 0) throw Error(s ? Ce(e) : Se(e));
            return r
        }
        let d = ge(a, o.props ?? {});
        return o.type !== i.Fragment && (d.ref = n ? u : l), i.cloneElement(o, d)
    });
    return t.displayName = `${e}.Slot`, t
}
F(fe, `createSlot`);
var pe = Symbol.for(`radix.slottable`);

function me(e) {
    let t = F(e => `child` in e ? e.children(e.child) : e.children, `Slottable`);
    return t.displayName = `${e}.Slottable`, t.__radixId = pe, t
}
F(me, `createSlottable`);
var he = F((e, t) => {
    if (`child` in e.props) {
        let t = e.props.child;
        return i.isValidElement(t) ? i.cloneElement(t, void 0, e.props.children(t.props.children)) : null
    }
    return i.isValidElement(t) ? t : null
}, `getSlottableElementFromSlottable`);

function ge(e, t) {
    let n = { ...t
    };
    for (let r in t) {
        let i = e[r],
            a = t[r];
        /^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
            let t = a(...e);
            return i(...e), t
        } : i && (n[r] = i) : r === `style` ? n[r] = { ...i,
            ...a
        } : r === `className` && (n[r] = [i, a].filter(Boolean).join(` `))
    }
    return { ...e,
        ...n
    }
}
F(ge, `mergeProps`);

function _e(e) {
    let t = Object.getOwnPropertyDescriptor(e.props, `ref`) ?.get,
        n = t && `isReactWarning` in t && t.isReactWarning;
    return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, `ref`) ?.get, n = t && `isReactWarning` in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}
F(_e, `getElementRef`);

function ve(e) {
    return i.isValidElement(e) && typeof e.type == `function` && `__radixId` in e.type && e.type.__radixId === pe
}
F(ve, `isSlottable`);
var ye = Symbol.for(`react.lazy`);

function be(e) {
    return typeof e == `object` && !!e && `$$typeof` in e && e.$$typeof === ye && `_payload` in e && xe(e._payload)
}
F(be, `isLazyComponent`);

function xe(e) {
    return typeof e == `object` && !!e && `then` in e
}
F(xe, `isPromiseLike`);
var Se = F(e => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, `createSlotError`),
    Ce = F(e => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, `createSlottableError`),
    we = i.use,
    Te = Object.defineProperty,
    I = (e, t) => Te(e, `name`, {
        value: t,
        configurable: !0
    });

function Ee(e) {
    let t = e + `CollectionProvider`,
        [n, r] = se(t),
        [a, o] = n(t, {
            collectionRef: {
                current: null
            },
            itemMap: new Map
        }),
        s = I(e => {
            let {
                scope: t,
                children: n
            } = e, r = i.useRef(null), o = i.useRef(new Map).current;
            return (0, D.jsx)(a, {
                scope: t,
                itemMap: o,
                collectionRef: r,
                children: n
            })
        }, `CollectionProvider`);
    s.displayName = t;
    let c = e + `CollectionSlot`,
        l = fe(c),
        u = i.forwardRef((e, t) => {
            let {
                scope: n,
                children: r
            } = e;
            return (0, D.jsx)(l, {
                ref: P(t, o(c, n).collectionRef),
                children: r
            })
        });
    u.displayName = c;
    let d = e + `CollectionItemSlot`,
        f = `data-radix-collection-item`,
        p = fe(d),
        m = i.forwardRef((e, t) => {
            let {
                scope: n,
                children: r,
                ...a
            } = e, s = i.useRef(null), c = P(t, s), l = o(d, n);
            return i.useEffect(() => (l.itemMap.set(s, {
                ref: s,
                ...a
            }), () => void l.itemMap.delete(s))), (0, D.jsx)(p, {
                [f]: ``,
                ref: c,
                children: r
            })
        });
    m.displayName = d;

    function h(t) {
        let n = o(e + `CollectionConsumer`, t);
        return i.useCallback(() => {
            let e = n.collectionRef.current;
            if (!e) return [];
            let t = Array.from(e.querySelectorAll(`[${f}]`));
            return Array.from(n.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current))
        }, [n.collectionRef, n.itemMap])
    }
    return I(h, `useCollection`), [{
        Provider: s,
        Slot: u,
        ItemSlot: m
    }, h, r]
}
I(Ee, `createCollection`);
var De = new WeakMap,
    Oe = class e extends Map {
        static {
            I(this, `OrderedDict`)
        }#e;
        constructor(e) {
            super(e), this.#e = [...super.keys()], De.set(this, !0)
        }
        set(e, t) {
            return De.get(this) && (this.has(e) ? this.#e[this.#e.indexOf(e)] = e : this.#e.push(e)), super.set(e, t), this
        }
        insert(e, t, n) {
            let r = this.has(t),
                i = this.#e.length,
                a = je(e),
                o = a >= 0 ? a : i + a,
                s = o < 0 || o >= i ? -1 : o;
            if (s === this.size || r && s === this.size - 1 || s === -1) return this.set(t, n), this;
            let c = this.size + +!r;
            a < 0 && o++;
            let l = [...this.#e],
                u, d = !1;
            for (let e = o; e < c; e++)
                if (o === e) {
                    let i = l[e];
                    l[e] === t && (i = l[e + 1]), r && this.delete(t), u = this.get(i), this.set(t, n)
                } else {
                    !d && l[e - 1] === t && (d = !0);
                    let n = l[d ? e : e - 1],
                        r = u;
                    u = this.get(n), this.delete(n), this.set(n, r)
                }
            return this
        }
        with(t, n, r) {
            let i = new e(this);
            return i.insert(t, n, r), i
        }
        before(e) {
            let t = this.#e.indexOf(e) - 1;
            if (!(t < 0)) return this.entryAt(t)
        }
        setBefore(e, t, n) {
            let r = this.#e.indexOf(e);
            return r === -1 ? this : this.insert(r, t, n)
        }
        after(e) {
            let t = this.#e.indexOf(e);
            if (t = t === -1 || t === this.size - 1 ? -1 : t + 1, t !== -1) return this.entryAt(t)
        }
        setAfter(e, t, n) {
            let r = this.#e.indexOf(e);
            return r === -1 ? this : this.insert(r + 1, t, n)
        }
        first() {
            return this.entryAt(0)
        }
        last() {
            return this.entryAt(-1)
        }
        clear() {
            return this.#e = [], super.clear()
        }
        delete(e) {
            let t = super.delete(e);
            return t && this.#e.splice(this.#e.indexOf(e), 1), t
        }
        deleteAt(e) {
            let t = this.keyAt(e);
            return t === void 0 ? !1 : this.delete(t)
        }
        at(e) {
            let t = ke(this.#e, e);
            if (t !== void 0) return this.get(t)
        }
        entryAt(e) {
            let t = ke(this.#e, e);
            if (t !== void 0) return [t, this.get(t)]
        }
        indexOf(e) {
            return this.#e.indexOf(e)
        }
        keyAt(e) {
            return ke(this.#e, e)
        }
        from(e, t) {
            let n = this.indexOf(e);
            if (n === -1) return;
            let r = n + t;
            return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.at(r)
        }
        keyFrom(e, t) {
            let n = this.indexOf(e);
            if (n === -1) return;
            let r = n + t;
            return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.keyAt(r)
        }
        find(e, t) {
            let n = 0;
            for (let r of this) {
                if (Reflect.apply(e, t, [r, n, this])) return r;
                n++
            }
        }
        findIndex(e, t) {
            let n = 0;
            for (let r of this) {
                if (Reflect.apply(e, t, [r, n, this])) return n;
                n++
            }
            return -1
        }
        filter(t, n) {
            let r = [],
                i = 0;
            for (let e of this) Reflect.apply(t, n, [e, i, this]) && r.push(e), i++;
            return new e(r)
        }
        map(t, n) {
            let r = [],
                i = 0;
            for (let e of this) r.push([e[0], Reflect.apply(t, n, [e, i, this])]), i++;
            return new e(r)
        }
        reduce(...e) {
            let [t, n] = e, r = 0, i = n ?? this.at(0);
            for (let n of this) i = r === 0 && e.length === 1 ? n : Reflect.apply(t, this, [i, n, r, this]), r++;
            return i
        }
        reduceRight(...e) {
            let [t, n] = e, r = n ?? this.at(-1);
            for (let n = this.size - 1; n >= 0; n--) {
                let i = this.at(n);
                r = n === this.size - 1 && e.length === 1 ? i : Reflect.apply(t, this, [r, i, n, this])
            }
            return r
        }
        toSorted(t) {
            return new e([...this.entries()].sort(t))
        }
        toReversed() {
            let t = new e;
            for (let e = this.size - 1; e >= 0; e--) {
                let n = this.keyAt(e),
                    r = this.get(n);
                t.set(n, r)
            }
            return t
        }
        toSpliced(...t) {
            let n = [...this.entries()];
            return n.splice(...t), new e(n)
        }
        slice(t, n) {
            let r = new e,
                i = this.size - 1;
            if (t === void 0) return r;
            t < 0 && (t += this.size), n !== void 0 && n > 0 && (i = n - 1);
            for (let e = t; e <= i; e++) {
                let t = this.keyAt(e),
                    n = this.get(t);
                r.set(t, n)
            }
            return r
        }
        every(e, t) {
            let n = 0;
            for (let r of this) {
                if (!Reflect.apply(e, t, [r, n, this])) return !1;
                n++
            }
            return !0
        }
        some(e, t) {
            let n = 0;
            for (let r of this) {
                if (Reflect.apply(e, t, [r, n, this])) return !0;
                n++
            }
            return !1
        }
    };

function ke(e, t) {
    if (`at` in Array.prototype) return Array.prototype.at.call(e, t);
    let n = Ae(e, t);
    return n === -1 ? void 0 : e[n]
}
I(ke, `at`);

function Ae(e, t) {
    let n = e.length,
        r = je(t),
        i = r >= 0 ? r : n + r;
    return i < 0 || i >= n ? -1 : i
}
I(Ae, `toSafeIndex`);

function je(e) {
    return e !== e || e === 0 ? 0 : Math.trunc(e)
}
I(je, `toSafeInteger`);

function Me(e) {
    let t = e + `CollectionProvider`,
        [n, r] = se(t),
        [a, o] = n(t, {
            collectionElement: null,
            collectionRef: {
                current: null
            },
            collectionRefObject: {
                current: null
            },
            itemMap: new Oe,
            setItemMap: I(() => void 0, `setItemMap`)
        }),
        s = I(({
            state: e,
            ...t
        }) => e ? (0, D.jsx)(l, { ...t,
            state: e
        }) : (0, D.jsx)(c, { ...t
        }), `CollectionProvider`);
    s.displayName = t;
    let c = I(e => {
        let t = g();
        return (0, D.jsx)(l, { ...e,
            state: t
        })
    }, `CollectionInit`);
    c.displayName = t + `Init`;
    let l = I(e => {
        let {
            scope: t,
            children: n,
            state: r
        } = e, o = i.useRef(null), [s, c] = i.useState(null), l = P(o, c), [u, d] = r;
        return i.useEffect(() => {
            if (!s) return;
            let e = Ie(() => {});
            return e.observe(s, {
                childList: !0,
                subtree: !0
            }), () => {
                e.disconnect()
            }
        }, [s]), (0, D.jsx)(a, {
            scope: t,
            itemMap: u,
            setItemMap: d,
            collectionRef: l,
            collectionRefObject: o,
            collectionElement: s,
            children: n
        })
    }, `CollectionProviderImpl`);
    l.displayName = t + `Impl`;
    let u = e + `CollectionSlot`,
        d = fe(u),
        f = i.forwardRef((e, t) => {
            let {
                scope: n,
                children: r
            } = e;
            return (0, D.jsx)(d, {
                ref: P(t, o(u, n).collectionRef),
                children: r
            })
        });
    f.displayName = u;
    let p = e + `CollectionItemSlot`,
        m = fe(p),
        h = i.forwardRef((e, t) => {
            let {
                scope: n,
                children: r,
                ...a
            } = e, s = i.useRef(null), [c, l] = i.useState(null), u = P(t, s, l), {
                setItemMap: d
            } = o(p, n), f = i.useRef(a);
            Ne(f.current, a) || (f.current = a);
            let h = f.current;
            return i.useEffect(() => {
                let e = h;
                return d(t => c ? t.has(c) ? t.set(c, { ...e,
                    element: c
                }).toSorted(Fe) : (t.set(c, { ...e,
                    element: c
                }), t.toSorted(Fe)) : t), () => {
                    d(e => !c || !e.has(c) ? e : (e.delete(c), new Oe(e)))
                }
            }, [c, h, d]), (0, D.jsx)(m, {
                "data-radix-collection-item": ``,
                ref: u,
                children: r
            })
        });
    h.displayName = p;

    function g() {
        return i.useState(new Oe)
    }
    I(g, `useInitCollection`);

    function _(t) {
        let {
            itemMap: n
        } = o(e + `CollectionConsumer`, t);
        return n
    }
    return I(_, `useCollection`), [{
        Provider: s,
        Slot: f,
        ItemSlot: h
    }, {
        createCollectionScope: r,
        useCollection: _,
        useInitCollection: g
    }]
}
I(Me, `createCollection`);

function Ne(e, t) {
    if (e === t) return !0;
    if (typeof e != `object` || typeof t != `object` || e == null || t == null) return !1;
    let n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (let r of n)
        if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return !1;
    return !0
}
I(Ne, `shallowEqual`);

function Pe(e, t) {
    return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING)
}
I(Pe, `isElementPreceding`);

function Fe(e, t) {
    return !e[1].element || !t[1].element ? 0 : Pe(e[1].element, t[1].element) ? -1 : 1
}
I(Fe, `sortByDocumentPosition`);

function Ie(e) {
    return new MutationObserver(t => {
        for (let n of t)
            if (n.type === `childList`) {
                e();
                return
            }
    })
}
I(Ie, `getChildListObserver`);
var Le = Object.defineProperty,
    Re = (e, t) => Le(e, `name`, {
        value: t,
        configurable: !0
    }),
    ze = !!(window.document && window.document.createElement);

function L(e, t, {
    checkForDefaultPrevented: n = !0
} = {}) {
    return Re(function(r) {
        if (e ?.(r), n === !1 || !r || !r.defaultPrevented) return t ?.(r)
    }, `handleEvent`)
}
Re(L, `composeEventHandlers`);

function Be(e) {
    if (!ze) throw Error(`Cannot access window outside of the DOM`);
    return e ?.ownerDocument ?.defaultView ?? window
}
Re(Be, `getOwnerWindow`);

function Ve(e) {
    if (!ze) throw Error(`Cannot access document outside of the DOM`);
    return e ?.ownerDocument ?? document
}
Re(Ve, `getOwnerDocument`);

function He(e, t = !1) {
    let {
        activeElement: n
    } = Ve(e);
    if (!n ?.nodeName) return null;
    if (Ue(n) && n.contentDocument) return He(n.contentDocument.body, t);
    if (t) {
        let e = n.getAttribute(`aria-activedescendant`);
        if (e) {
            let t = Ve(n).getElementById(e);
            if (t) return t
        }
    }
    return n
}
Re(He, `getActiveElement`);

function Ue(e) {
    return e.tagName === `IFRAME`
}
Re(Ue, `isFrame`);
var R = globalThis ?.document ? i.useLayoutEffect : () => {},
    We = Object.defineProperty,
    Ge = (e, t) => We(e, `name`, {
        value: t,
        configurable: !0
    }),
    Ke = i.useEffectEvent,
    qe = i.useInsertionEffect;

function Je(e) {
    if (typeof Ke == `function`) return Ke(e);
    let t = i.useRef(() => {
        throw Error(`Cannot call an event handler while rendering.`)
    });
    return typeof qe == `function` ? qe(() => {
        t.current = e
    }) : R(() => {
        t.current = e
    }), i.useMemo(() => ((...e) => t.current ?.(...e)), [])
}
Ge(Je, `useEffectEvent`);
var Ye = Object.defineProperty,
    Xe = (e, t) => Ye(e, `name`, {
        value: t,
        configurable: !0
    }),
    Ze = i.useInsertionEffect || R;

function Qe({
    prop: e,
    defaultProp: t,
    onChange: n = Xe(() => {}, `onChange`),
    caller: r
}) {
    let [a, o, s] = $e({
        defaultProp: t,
        onChange: n
    }), c = e !== void 0;
    return [c ? e : a, i.useCallback(t => {
        if (c) {
            let n = et(t) ? t(e) : t;
            n !== e && s.current ?.(n)
        } else o(t)
    }, [c, e, o, s])]
}
Xe(Qe, `useControllableState`);

function $e({
    defaultProp: e,
    onChange: t
}) {
    let [n, r] = i.useState(e), a = i.useRef(n), o = i.useRef(t);
    return Ze(() => {
        o.current = t
    }, [t]), i.useEffect(() => {
        a.current !== n && (o.current ?.(n), a.current = n)
    }, [n, a]), [n, r, o]
}
Xe($e, `useUncontrolledState`);

function et(e) {
    return typeof e == `function`
}
Xe(et, `isFunction`);
var tt = Symbol(`RADIX:SYNC_STATE`);

function nt(e, t, n, r) {
    let {
        prop: a,
        defaultProp: o,
        onChange: s,
        caller: c
    } = t, l = a !== void 0, u = Je(s), d = [{ ...n,
        state: o
    }];
    r && d.push(r);
    let [f, p] = i.useReducer((t, n) => {
        if (n.type === tt) return { ...t,
            state: n.state
        };
        let r = e(t, n);
        return l && !Object.is(r.state, t.state) && u(r.state), r
    }, ...d), m = f.state, h = i.useRef(m);
    i.useEffect(() => {
        h.current !== m && (h.current = m, l || u(m))
    }, [m, h, l]);
    let g = i.useMemo(() => a === void 0 ? f : { ...f,
        state: a
    }, [f, a]);
    return i.useEffect(() => {
        l && !Object.is(a, f.state) && p({
            type: tt,
            state: a
        })
    }, [a, f.state, l]), [g, p]
}
Xe(nt, `useControllableStateReducer`);
var rt = Object.defineProperty,
    it = (e, t) => rt(e, `name`, {
        value: t,
        configurable: !0
    });

function at(e, t) {
    return i.useReducer((e, n) => t[e][n] ?? e, e)
}
it(at, `useStateMachine`);
var ot = it(e => {
    let {
        present: t,
        children: n
    } = e, r = st(t), a = typeof n == `function` ? n({
        present: r.isPresent
    }) : i.Children.only(n), o = lt(r.ref, dt(a));
    return typeof n == `function` || r.isPresent ? i.cloneElement(a, {
        ref: o
    }) : null
}, `Presence`);

function st(e) {
    let [t, n] = i.useState(), r = i.useRef(null), a = i.useRef(e), o = i.useRef(`none`), s = i.useRef(void 0), [c, l] = at(e ? `mounted` : `unmounted`, {
        mounted: {
            UNMOUNT: `unmounted`,
            ANIMATION_OUT: `unmountSuspended`
        },
        unmountSuspended: {
            MOUNT: `mounted`,
            ANIMATION_END: `unmounted`
        },
        unmounted: {
            MOUNT: `mounted`
        }
    });
    return i.useEffect(() => {
        c === `mounted` ? (o.current = s.current ?? ut(r.current), s.current = void 0) : o.current = `none`
    }, [c]), R(() => {
        let t = r.current,
            n = a.current;
        if (n !== e) {
            let r = o.current,
                i = ut(t);
            e ? (s.current = i, l(`MOUNT`)) : i === `none` || t ?.display === `none` ? l(`UNMOUNT`) : l(n && r !== i ? `ANIMATION_OUT` : `UNMOUNT`), a.current = e
        }
    }, [e, l]), R(() => {
        if (t) {
            let e, n = t.ownerDocument.defaultView ?? window,
                i = it(i => {
                    let o = ut(r.current).includes(CSS.escape(i.animationName));
                    if (i.target === t && o && (l(`ANIMATION_END`), !a.current)) {
                        let r = t.style.animationFillMode;
                        t.style.animationFillMode = `forwards`, e = n.setTimeout(() => {
                            t.style.animationFillMode === `forwards` && (t.style.animationFillMode = r)
                        })
                    }
                }, `handleAnimationEnd`),
                s = it(e => {
                    e.target === t && (o.current = ut(r.current))
                }, `handleAnimationStart`);
            return t.addEventListener(`animationstart`, s), t.addEventListener(`animationcancel`, i), t.addEventListener(`animationend`, i), () => {
                n.clearTimeout(e), t.removeEventListener(`animationstart`, s), t.removeEventListener(`animationcancel`, i), t.removeEventListener(`animationend`, i)
            }
        } else l(`ANIMATION_END`)
    }, [t, l]), {
        isPresent: [`mounted`, `unmountSuspended`].includes(c),
        ref: i.useCallback(e => {
            if (e) {
                let t = getComputedStyle(e);
                r.current = t, s.current = ut(t)
            } else r.current = null;
            n(e)
        }, [])
    }
}
it(st, `usePresence`);

function ct(e, t) {
    if (typeof e == `function`) return e(t);
    e != null && (e.current = t)
}
it(ct, `setRef`);

function lt(...e) {
    let t = i.useRef(e);
    return t.current = e, i.useCallback(e => {
        let n = t.current,
            r = !1,
            i = n.map(t => {
                let n = ct(t, e);
                return !r && typeof n == `function` && (r = !0), n
            });
        if (r) return () => {
            for (let e = 0; e < i.length; e++) {
                let t = i[e];
                typeof t == `function` ? t() : ct(n[e], null)
            }
        }
    }, [])
}
it(lt, `useStableComposedRefs`);

function ut(e) {
    return e ?.animationName || `none`
}
it(ut, `getAnimationName`);

function dt(e) {
    let t = Object.getOwnPropertyDescriptor(e.props, `ref`) ?.get,
        n = t && `isReactWarning` in t && t.isReactWarning;
    return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, `ref`) ?.get, n = t && `isReactWarning` in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}
it(dt, `getElementRef`);
var ft = Object.defineProperty,
    pt = (e, t) => ft(e, `name`, {
        value: t,
        configurable: !0
    }),
    mt = i.useId || (() => void 0),
    ht = 0;

function gt(e) {
    let [t, n] = i.useState(mt());
    return R(() => {
        e || n(e => e ?? String(ht++))
    }, [e]), e || (t ? `radix-${t}` : ``)
}
pt(gt, `useId`);
var _t = Object.defineProperty,
    vt = (e, t) => _t(e, `name`, {
        value: t,
        configurable: !0
    }),
    yt = i.createContext(void 0);

function bt(e) {
    let t = i.useContext(yt);
    return e || t || `ltr`
}
vt(bt, `useDirection`);
var xt = Object.defineProperty,
    St = (e, t) => xt(e, `name`, {
        value: t,
        configurable: !0
    });

function Ct(e, t) {
    if (typeof e == `function`) return e(t);
    e != null && (e.current = t)
}
St(Ct, `setRef`);

function wt(...e) {
    return t => {
        let n = !1,
            r = e.map(e => {
                let r = Ct(e, t);
                return !n && typeof r == `function` && (n = !0), r
            });
        if (n) return () => {
            for (let t = 0; t < r.length; t++) {
                let n = r[t];
                typeof n == `function` ? n() : Ct(e[t], null)
            }
        }
    }
}
St(wt, `composeRefs`);

function Tt(...e) {
    return i.useCallback(wt(...e), e)
}
St(Tt, `useComposedRefs`);
var Et = Object.defineProperty,
    Dt = (e, t) => Et(e, `name`, {
        value: t,
        configurable: !0
    });

function Ot(e, t) {
    if (typeof e == `function`) return e(t);
    e != null && (e.current = t)
}
Dt(Ot, `setRef`);

function kt(...e) {
    return t => {
        let n = !1,
            r = e.map(e => {
                let r = Ot(e, t);
                return !n && typeof r == `function` && (n = !0), r
            });
        if (n) return () => {
            for (let t = 0; t < r.length; t++) {
                let n = r[t];
                typeof n == `function` ? n() : Ot(e[t], null)
            }
        }
    }
}
Dt(kt, `composeRefs`);

function At(...e) {
    return i.useCallback(kt(...e), e)
}
Dt(At, `useComposedRefs`);
var jt = Object.defineProperty,
    Mt = (e, t) => jt(e, `name`, {
        value: t,
        configurable: !0
    });

function Nt(e) {
    let t = i.useRef(e);
    return i.useEffect(() => {
        t.current = e
    }), i.useMemo(() => ((...e) => t.current ?.(...e)), [])
}
Mt(Nt, `useCallbackRef`);
var Pt = Object.defineProperty,
    z = (e, t) => Pt(e, `name`, {
        value: t,
        configurable: !0
    }),
    Ft = `dismissableLayer.update`,
    It = `dismissableLayer.pointerDownOutside`,
    Lt = `dismissableLayer.focusOutside`,
    Rt, zt = i.createContext({
        layers: new Set,
        layersWithOutsidePointerEventsDisabled: new Set,
        branches: new Set,
        dismissableSurfaces: new Set
    }),
    Bt = i.forwardRef(z(function(e, t) {
        let {
            disableOutsidePointerEvents: n = !1,
            deferPointerDownOutside: r = !1,
            onEscapeKeyDown: a,
            onPointerDownOutside: o,
            onFocusOutside: s,
            onInteractOutside: c,
            onDismiss: l,
            ...u
        } = e, d = i.useContext(zt), [f, p] = i.useState(null), m = f ?.ownerDocument ?? globalThis ?.document, [, h] = i.useState({}), g = At(t, p), _ = Array.from(d.layers), [v] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), y = v ? _.indexOf(v) : -1, b = f ? _.indexOf(f) : -1, x = d.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= y, C = i.useRef(!1), w = Ut(e => {
            o ?.(e), c ?.(e), e.defaultPrevented || l ?.()
        }, {
            ownerDocument: m,
            deferPointerDownOutside: r,
            isDeferredPointerDownOutsideRef: C,
            dismissableSurfaces: d.dismissableSurfaces,
            shouldHandlePointerDownOutside: i.useCallback(e => {
                if (!(e instanceof Node)) return !1;
                let t = [...d.branches].some(t => t.contains(e));
                return S && !t
            }, [d.branches, S])
        }), T = Wt(e => {
            if (r && C.current) return;
            let t = e.target;
            [...d.branches].some(e => e.contains(t)) || (s ?.(e), c ?.(e), e.defaultPrevented || l ?.())
        }, m), E = f ? b === _.length - 1 : !1, ee = Nt(e => {
            e.key === `Escape` && (a ?.(e), !e.defaultPrevented && l && (e.preventDefault(), l()))
        });
        return i.useEffect(() => {
            if (E) return m.addEventListener(`keydown`, ee, {
                capture: !0
            }), () => m.removeEventListener(`keydown`, ee, {
                capture: !0
            })
        }, [m, E, ee]), i.useEffect(() => {
            if (f) return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (Rt = m.body.style.pointerEvents, m.body.style.pointerEvents = `none`), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), Gt(), () => {
                n && (d.layersWithOutsidePointerEventsDisabled.delete(f), d.layersWithOutsidePointerEventsDisabled.size === 0 && (m.body.style.pointerEvents = Rt))
            }
        }, [f, m, n, d]), i.useEffect(() => () => {
            f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), Gt())
        }, [f, d]), i.useEffect(() => {
            let e = z(() => h({}), `handleUpdate`);
            return document.addEventListener(Ft, e), () => document.removeEventListener(Ft, e)
        }, []), (0, D.jsx)(k.div, { ...u,
            ref: g,
            style: {
                pointerEvents: x ? S ? `auto` : `none` : void 0,
                ...e.style
            },
            onFocusCapture: L(e.onFocusCapture, T.onFocusCapture),
            onBlurCapture: L(e.onBlurCapture, T.onBlurCapture),
            onPointerDownCapture: L(e.onPointerDownCapture, w.onPointerDownCapture)
        })
    }, `DismissableLayer`));

function Vt() {
    let e = i.useContext(zt),
        [t, n] = i.useState(null);
    return i.useEffect(() => {
        if (t) return e.dismissableSurfaces.add(t), () => {
            e.dismissableSurfaces.delete(t)
        }
    }, [t, e.dismissableSurfaces]), n
}
z(Vt, `useDismissableLayerSurface`);
var Ht = z(() => !0, `IS_TRUE`);

function Ut(e, t) {
    let {
        ownerDocument: n = globalThis ?.document,
        deferPointerDownOutside: r = !1,
        isDeferredPointerDownOutsideRef: a,
        dismissableSurfaces: o,
        shouldHandlePointerDownOutside: s = Ht
    } = t, c = Nt(e), l = i.useRef(!1), u = i.useRef(!1), d = i.useRef(new Map), f = i.useRef(() => {});
    return i.useEffect(() => {
        function e() {
            u.current = !1, a.current = !1, d.current.clear()
        }
        z(e, `resetOutsideInteraction`);

        function t() {
            return Array.from(d.current.values()).some(Boolean)
        }
        z(t, `isOutsideInteractionIntercepted`);

        function i(e) {
            if (!u.current) return;
            let t = e.target;
            t instanceof Node && [...o].some(e => e.contains(t)) || d.current.set(e.type, !0), e.type === `click` && window.setTimeout(() => {
                u.current && f.current()
            }, 0)
        }
        z(i, `handleInteractionCapture`);

        function p(e) {
            u.current && d.current.set(e.type, !1)
        }
        z(p, `handleInteractionBubble`);
        let m = z(i => {
                if (i.target && !l.current) {
                    let o = function() {
                        n.removeEventListener(`click`, f.current);
                        let r = t();
                        e(), r || Kt(It, c, p, {
                            discrete: !0
                        })
                    };
                    if (z(o, `handleAndDispatchPointerDownOutsideEvent`), !s(i.target)) {
                        n.removeEventListener(`click`, f.current), e(), l.current = !1;
                        return
                    }
                    let p = {
                        originalEvent: i
                    };
                    u.current = !0, a.current = r && i.button === 0, d.current.clear(), !r || i.button !== 0 ? o() : (n.removeEventListener(`click`, f.current), f.current = o, n.addEventListener(`click`, f.current, {
                        once: !0
                    }))
                } else n.removeEventListener(`click`, f.current), e();
                l.current = !1
            }, `handlePointerDown`),
            h = [`pointerup`, `mousedown`, `mouseup`, `touchstart`, `touchend`, `click`];
        for (let e of h) n.addEventListener(e, i, !0), n.addEventListener(e, p);
        let g = window.setTimeout(() => {
            n.addEventListener(`pointerdown`, m)
        }, 0);
        return () => {
            window.clearTimeout(g), n.removeEventListener(`pointerdown`, m), n.removeEventListener(`click`, f.current);
            for (let e of h) n.removeEventListener(e, i, !0), n.removeEventListener(e, p)
        }
    }, [n, c, r, a, o, s]), {
        onPointerDownCapture: z(() => l.current = !0, `onPointerDownCapture`)
    }
}
z(Ut, `usePointerDownOutside`);

function Wt(e, t = globalThis ?.document) {
    let n = Nt(e),
        r = i.useRef(!1);
    return i.useEffect(() => {
        let e = z(e => {
            e.target && !r.current && Kt(Lt, n, {
                originalEvent: e
            }, {
                discrete: !1
            })
        }, `handleFocus`);
        return t.addEventListener(`focusin`, e), () => t.removeEventListener(`focusin`, e)
    }, [t, n]), {
        onFocusCapture: z(() => r.current = !0, `onFocusCapture`),
        onBlurCapture: z(() => r.current = !1, `onBlurCapture`)
    }
}
z(Wt, `useFocusOutside`);

function Gt() {
    let e = new CustomEvent(Ft);
    document.dispatchEvent(e)
}
z(Gt, `dispatchUpdate`);

function Kt(e, t, n, {
    discrete: r
}) {
    let i = n.originalEvent.target,
        a = new CustomEvent(e, {
            bubbles: !1,
            cancelable: !0,
            detail: n
        });
    t && i.addEventListener(e, t, {
        once: !0
    }), r ? ae(i, a) : i.dispatchEvent(a)
}
z(Kt, `handleAndDispatchCustomEvent`);
var qt = Object.defineProperty,
    Jt = (e, t) => qt(e, `name`, {
        value: t,
        configurable: !0
    });

function Yt(e, t) {
    if (typeof e == `function`) return e(t);
    e != null && (e.current = t)
}
Jt(Yt, `setRef`);

function Xt(...e) {
    return t => {
        let n = !1,
            r = e.map(e => {
                let r = Yt(e, t);
                return !n && typeof r == `function` && (n = !0), r
            });
        if (n) return () => {
            for (let t = 0; t < r.length; t++) {
                let n = r[t];
                typeof n == `function` ? n() : Yt(e[t], null)
            }
        }
    }
}
Jt(Xt, `composeRefs`);

function Zt(...e) {
    return i.useCallback(Xt(...e), e)
}
Jt(Zt, `useComposedRefs`);
var Qt = Object.defineProperty,
    B = (e, t) => Qt(e, `name`, {
        value: t,
        configurable: !0
    }),
    $t = `focusScope.autoFocusOnMount`,
    en = `focusScope.autoFocusOnUnmount`,
    tn = {
        bubbles: !1,
        cancelable: !0
    },
    nn = i.forwardRef(B(function(e, t) {
        let {
            loop: n = !1,
            trapped: r = !1,
            onMountAutoFocus: a,
            onUnmountAutoFocus: o,
            ...s
        } = e, [c, l] = i.useState(null), u = Nt(a), d = Nt(o), f = i.useRef(null), p = Zt(t, l), m = i.useRef({
            paused: !1,
            pause() {
                this.paused = !0
            },
            resume() {
                this.paused = !1
            }
        }).current;
        i.useEffect(() => {
            if (r) {
                let e = function(e) {
                        if (m.paused || !c) return;
                        let t = e.target;
                        c.contains(t) ? f.current = t : V(f.current, {
                            select: !0
                        })
                    },
                    t = function(e) {
                        if (m.paused || !c) return;
                        let t = e.relatedTarget;
                        t !== null && (c.contains(t) || V(f.current, {
                            select: !0
                        }))
                    },
                    n = function(e) {
                        if (document.activeElement === document.body)
                            for (let t of e) t.removedNodes.length > 0 && V(c)
                    };
                B(e, `handleFocusIn`), B(t, `handleFocusOut`), B(n, `handleMutations`), document.addEventListener(`focusin`, e), document.addEventListener(`focusout`, t);
                let r = new MutationObserver(n);
                return c && r.observe(c, {
                    childList: !0,
                    subtree: !0
                }), () => {
                    document.removeEventListener(`focusin`, e), document.removeEventListener(`focusout`, t), r.disconnect()
                }
            }
        }, [r, c, m.paused]), i.useEffect(() => {
            if (c) {
                un.add(m);
                let e = document.activeElement;
                if (!c.contains(e)) {
                    let t = new CustomEvent($t, tn);
                    c.addEventListener($t, u), c.dispatchEvent(t), t.defaultPrevented || (rn(pn(on(c)), {
                        select: !0
                    }), document.activeElement === e && V(c))
                }
                return () => {
                    c.removeEventListener($t, u), setTimeout(() => {
                        let t = new CustomEvent(en, tn);
                        c.addEventListener(en, d), c.dispatchEvent(t), t.defaultPrevented || V(e ?? document.body, {
                            select: !0
                        }), c.removeEventListener(en, d), un.remove(m)
                    }, 0)
                }
            }
        }, [c, u, d, m]);
        let h = i.useCallback(e => {
            if (!n && !r || m.paused) return;
            let t = e.key === `Tab` && !e.altKey && !e.ctrlKey && !e.metaKey,
                i = document.activeElement;
            if (t && i) {
                let t = e.currentTarget,
                    [r, a] = an(t);
                r && a ? !e.shiftKey && i === a ? (e.preventDefault(), n && V(r, {
                    select: !0
                })) : e.shiftKey && i === r && (e.preventDefault(), n && V(a, {
                    select: !0
                })) : i === t && e.preventDefault()
            }
        }, [n, r, m.paused]);
        return (0, D.jsx)(k.div, {
            tabIndex: -1,
            ...s,
            ref: p,
            onKeyDown: h
        })
    }, `FocusScope`));

function rn(e, {
    select: t = !1
} = {}) {
    let n = document.activeElement;
    for (let r of e)
        if (V(r, {
                select: t
            }), document.activeElement !== n) return
}
B(rn, `focusFirst`);

function an(e) {
    let t = on(e);
    return [sn(t, e), sn(t.reverse(), e)]
}
B(an, `getTabbableEdges`);

function on(e) {
    let t = [],
        n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: B(e => {
                let t = e.tagName === `INPUT` && e.type === `hidden`;
                return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
            }, `acceptNode`)
        });
    for (; n.nextNode();) t.push(n.currentNode);
    return t
}
B(on, `getTabbableCandidates`);

function sn(e, t) {
    let n = typeof t.checkVisibility == `function` && t.checkVisibility({
        checkVisibilityCSS: !0
    });
    for (let r of e)
        if (!(n ? !r.checkVisibility({
                checkVisibilityCSS: !0
            }) : cn(r, {
                upTo: t
            }))) return r
}
B(sn, `findVisible`);

function cn(e, {
    upTo: t
}) {
    if (getComputedStyle(e).visibility === `hidden`) return !0;
    for (; e;) {
        if (t !== void 0 && e === t) return !1;
        if (getComputedStyle(e).display === `none`) return !0;
        e = e.parentElement
    }
    return !1
}
B(cn, `isHidden`);

function ln(e) {
    return e instanceof HTMLInputElement && `select` in e
}
B(ln, `isSelectableInput`);

function V(e, {
    select: t = !1
} = {}) {
    if (e && e.focus) {
        let n = document.activeElement;
        e.focus({
            preventScroll: !0
        }), e !== n && ln(e) && t && e.select()
    }
}
B(V, `focus`);
var un = dn();

function dn() {
    let e = [];
    return {
        add(t) {
            let n = e[0];
            t !== n && n ?.pause(), e = fn(e, t), e.unshift(t)
        },
        remove(t) {
            e = fn(e, t), e[0] ?.resume()
        }
    }
}
B(dn, `createFocusScopesStack`);

function fn(e, t) {
    let n = [...e],
        r = n.indexOf(t);
    return r !== -1 && n.splice(r, 1), n
}
B(fn, `arrayRemove`);

function pn(e) {
    return e.filter(e => e.tagName !== `A`)
}
B(pn, `removeLinks`);
var mn = Object.defineProperty,
    hn = i.forwardRef(((e, t) => mn(e, `name`, {
        value: t,
        configurable: !0
    }))(function(e, t) {
        let {
            container: n,
            ...r
        } = e, [a, o] = i.useState(!1);
        R(() => o(!0), []);
        let s = n || a && globalThis ?.document ?.body;
        return s ? re.createPortal((0, D.jsx)(k.div, { ...r,
            ref: t
        }), s) : null
    }, `Portal`)),
    gn = Object.defineProperty,
    _n = (e, t) => gn(e, `name`, {
        value: t,
        configurable: !0
    }),
    vn = 0,
    yn = null;

function bn(e) {
    return xn(), e.children
}
_n(bn, `FocusGuards`);

function xn() {
    i.useEffect(() => {
        yn ||= {
            start: Sn(),
            end: Sn()
        };
        let {
            start: e,
            end: t
        } = yn;
        return document.body.firstElementChild !== e && document.body.insertAdjacentElement(`afterbegin`, e), document.body.lastElementChild !== t && document.body.insertAdjacentElement(`beforeend`, t), vn++, () => {
            vn === 1 && (yn ?.start.remove(), yn ?.end.remove(), yn = null), vn = Math.max(0, vn - 1)
        }
    }, [])
}
_n(xn, `useFocusGuards`);

function Sn() {
    let e = document.createElement(`span`);
    return e.setAttribute(`data-radix-focus-guard`, ``), e.tabIndex = 0, e.style.outline = `none`, e.style.opacity = `0`, e.style.position = `fixed`, e.style.pointerEvents = `none`, e
}
_n(Sn, `createFocusGuard`);
var H = function() {
    return H = Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e
    }, H.apply(this, arguments)
};

function Cn(e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == `function`)
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n
}

function wn(e, t, n) {
    if (n || arguments.length === 2)
        for (var r = 0, i = t.length, a; r < i; r++)(a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
    return e.concat(a || Array.prototype.slice.call(t))
}
var Tn = `right-scroll-bar-position`,
    En = `width-before-scroll-bar`,
    Dn = `with-scroll-bars-hidden`,
    On = `--removed-body-scroll-bar-size`;

function kn(e, t) {
    return typeof e == `function` ? e(t) : e && (e.current = t), e
}

function An(e, t) {
    var n = (0, i.useState)(function() {
        return {
            value: e,
            callback: t,
            facade: {
                get current() {
                    return n.value
                },
                set current(e) {
                    var t = n.value;
                    t !== e && (n.value = e, n.callback(e, t))
                }
            }
        }
    })[0];
    return n.callback = t, n.facade
}
var jn = i.useLayoutEffect,
    Mn = new WeakMap;

function Nn(e, t) {
    var n = An(t || null, function(t) {
        return e.forEach(function(e) {
            return kn(e, t)
        })
    });
    return jn(function() {
        var t = Mn.get(n);
        if (t) {
            var r = new Set(t),
                i = new Set(e),
                a = n.current;
            r.forEach(function(e) {
                i.has(e) || kn(e, null)
            }), i.forEach(function(e) {
                r.has(e) || kn(e, a)
            })
        }
        Mn.set(n, e)
    }, [e]), n
}

function Pn(e) {
    return e
}

function Fn(e, t) {
    t === void 0 && (t = Pn);
    var n = [],
        r = !1;
    return {
        read: function() {
            if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
            return n.length ? n[n.length - 1] : e
        },
        useMedium: function(e) {
            var i = t(e, r);
            return n.push(i),
                function() {
                    n = n.filter(function(e) {
                        return e !== i
                    })
                }
        },
        assignSyncMedium: function(e) {
            for (r = !0; n.length;) {
                var t = n;
                n = [], t.forEach(e)
            }
            n = {
                push: function(t) {
                    return e(t)
                },
                filter: function() {
                    return n
                }
            }
        },
        assignMedium: function(e) {
            r = !0;
            var t = [];
            if (n.length) {
                var i = n;
                n = [], i.forEach(e), t = n
            }
            var a = function() {
                    var n = t;
                    t = [], n.forEach(e)
                },
                o = function() {
                    return Promise.resolve().then(a)
                };
            o(), n = {
                push: function(e) {
                    t.push(e), o()
                },
                filter: function(e) {
                    return t = t.filter(e), n
                }
            }
        }
    }
}

function In(e) {
    e === void 0 && (e = {});
    var t = Fn(null);
    return t.options = H({
        async: !0,
        ssr: !1
    }, e), t
}
var Ln = function(e) {
    var t = e.sideCar,
        n = Cn(e, [`sideCar`]);
    if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
    var r = t.read();
    if (!r) throw Error(`Sidecar medium not found`);
    return i.createElement(r, H({}, n))
};
Ln.isSideCarExport = !0;

function Rn(e, t) {
    return e.useMedium(t), Ln
}
var zn = In(),
    Bn = function() {},
    Vn = i.forwardRef(function(e, t) {
        var n = i.useRef(null),
            r = i.useState({
                onScrollCapture: Bn,
                onWheelCapture: Bn,
                onTouchMoveCapture: Bn
            }),
            a = r[0],
            o = r[1],
            s = e.forwardProps,
            c = e.children,
            l = e.className,
            u = e.removeScrollBar,
            d = e.enabled,
            f = e.shards,
            p = e.sideCar,
            m = e.noRelative,
            h = e.noIsolation,
            g = e.inert,
            _ = e.allowPinchZoom,
            v = e.as,
            y = v === void 0 ? `div` : v,
            b = e.gapMode,
            x = Cn(e, [`forwardProps`, `children`, `className`, `removeScrollBar`, `enabled`, `shards`, `sideCar`, `noRelative`, `noIsolation`, `inert`, `allowPinchZoom`, `as`, `gapMode`]),
            S = p,
            C = Nn([n, t]),
            w = H(H({}, x), a);
        return i.createElement(i.Fragment, null, d && i.createElement(S, {
            sideCar: zn,
            removeScrollBar: u,
            shards: f,
            noRelative: m,
            noIsolation: h,
            inert: g,
            setCallbacks: o,
            allowPinchZoom: !!_,
            lockRef: n,
            gapMode: b
        }), s ? i.cloneElement(i.Children.only(c), H(H({}, w), {
            ref: C
        })) : i.createElement(y, H({}, w, {
            className: l,
            ref: C
        }), c))
    });
Vn.defaultProps = {
    enabled: !0,
    removeScrollBar: !0,
    inert: !1
}, Vn.classNames = {
    fullWidth: En,
    zeroRight: Tn
};
var Hn, Un = function() {
    if (Hn) return Hn;
    if (typeof __webpack_nonce__ < `u`) return __webpack_nonce__
};

function Wn() {
    if (!document) return null;
    var e = document.createElement(`style`);
    e.type = `text/css`;
    var t = Un();
    return t && e.setAttribute(`nonce`, t), e
}

function Gn(e, t) {
    e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t))
}

function Kn(e) {
    (document.head || document.getElementsByTagName(`head`)[0]).appendChild(e)
}
var qn = function() {
        var e = 0,
            t = null;
        return {
            add: function(n) {
                e == 0 && (t = Wn()) && (Gn(t, n), Kn(t)), e++
            },
            remove: function() {
                e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null)
            }
        }
    },
    Jn = function() {
        var e = qn();
        return function(t, n) {
            i.useEffect(function() {
                return e.add(t),
                    function() {
                        e.remove()
                    }
            }, [t && n])
        }
    },
    Yn = function() {
        var e = Jn();
        return function(t) {
            var n = t.styles,
                r = t.dynamic;
            return e(n, r), null
        }
    },
    Xn = function(e) {
        return parseInt(e || ``, 10) || 0
    },
    Zn = function(e) {
        var t = window.getComputedStyle(document.body),
            n = t[e === `padding` ? `paddingLeft` : `marginLeft`],
            r = t[e === `padding` ? `paddingTop` : `marginTop`],
            i = t[e === `padding` ? `paddingRight` : `marginRight`];
        return [Xn(n), Xn(r), Xn(i)]
    },
    Qn = function(e) {
        e === void 0 && (e = `margin`);
        var t = Zn(e),
            n = document.documentElement.clientWidth,
            r = window.innerWidth;
        return {
            left: t[0],
            top: t[1],
            right: t[2],
            gap: Math.max(0, r - n + t[2] - t[0])
        }
    },
    $n = Yn(),
    er = `data-scroll-locked`,
    tr = function(e, t, n, r) {
        var i = e.left,
            a = e.top,
            o = e.right,
            s = e.gap;
        return n === void 0 && (n = `margin`), `
  .${Dn} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${er}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[t&&`position: relative ${r};`,n===`margin`&&`
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,n===`padding`&&`padding-right: ${s}px ${r};`].filter(Boolean).join(``)}
  }
  
  .${Tn} {
    right: ${s}px ${r};
  }
  
  .${En} {
    margin-right: ${s}px ${r};
  }
  
  .${Tn} .${Tn} {
    right: 0 ${r};
  }
  
  .${En} .${En} {
    margin-right: 0 ${r};
  }
  
  body[${er}] {
    ${On}: ${s}px;
  }
`
    },
    nr = function() {
        var e = parseInt(document.body.getAttribute(`data-scroll-locked`) || `0`, 10);
        return isFinite(e) ? e : 0
    },
    rr = function() {
        i.useEffect(function() {
            return document.body.setAttribute(er, (nr() + 1).toString()),
                function() {
                    var e = nr() - 1;
                    e <= 0 ? document.body.removeAttribute(er) : document.body.setAttribute(er, e.toString())
                }
        }, [])
    },
    ir = function(e) {
        var t = e.noRelative,
            n = e.noImportant,
            r = e.gapMode,
            a = r === void 0 ? `margin` : r;
        rr();
        var o = i.useMemo(function() {
            return Qn(a)
        }, [a]);
        return i.createElement($n, {
            styles: tr(o, !t, a, n ? `` : `!important`)
        })
    },
    ar = !1;
try {
    var or = Object.defineProperty({}, `passive`, {
        get: function() {
            return ar = !0, !0
        }
    });
    window.addEventListener(`test`, or, or), window.removeEventListener(`test`, or, or)
} catch {
    ar = !1
}
var sr = ar ? {
        passive: !1
    } : !1,
    cr = function(e) {
        return e.tagName === `TEXTAREA`
    },
    lr = function(e, t) {
        if (!(e instanceof Element)) return !1;
        var n = window.getComputedStyle(e);
        return n[t] !== `hidden` && !(n.overflowY === n.overflowX && !cr(e) && n[t] === `visible`)
    },
    ur = function(e) {
        return lr(e, `overflowY`)
    },
    dr = function(e) {
        return lr(e, `overflowX`)
    },
    fr = function(e, t) {
        var n = t.ownerDocument,
            r = t;
        do {
            if (typeof ShadowRoot < `u` && r instanceof ShadowRoot && (r = r.host), hr(e, r)) {
                var i = gr(e, r);
                if (i[1] > i[2]) return !0
            }
            r = r.parentNode
        } while (r && r !== n.body);
        return !1
    },
    pr = function(e) {
        return [e.scrollTop, e.scrollHeight, e.clientHeight]
    },
    mr = function(e) {
        return [e.scrollLeft, e.scrollWidth, e.clientWidth]
    },
    hr = function(e, t) {
        return e === `v` ? ur(t) : dr(t)
    },
    gr = function(e, t) {
        return e === `v` ? pr(t) : mr(t)
    },
    _r = function(e, t) {
        return e === `h` && t === `rtl` ? -1 : 1
    },
    vr = function(e, t, n, r, i) {
        var a = _r(e, window.getComputedStyle(t).direction),
            o = a * r,
            s = n.target,
            c = t.contains(s),
            l = !1,
            u = o > 0,
            d = 0,
            f = 0;
        do {
            if (!s) break;
            var p = gr(e, s),
                m = p[0],
                h = p[1] - p[2] - a * m;
            (m || h) && hr(e, s) && (d += h, f += m);
            var g = s.parentNode;
            s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g
        } while (!c && s !== document.body || c && (t.contains(s) || t === s));
        return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l
    },
    yr = function(e) {
        return `changedTouches` in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0]
    },
    br = function(e) {
        return [e.deltaX, e.deltaY]
    },
    xr = function(e) {
        return e && `current` in e ? e.current : e
    },
    Sr = function(e, t) {
        return e[0] === t[0] && e[1] === t[1]
    },
    Cr = function(e) {
        return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`
    },
    wr = 0,
    Tr = [];

function Er(e) {
    var t = i.useRef([]),
        n = i.useRef([0, 0]),
        r = i.useRef(),
        a = i.useState(wr++)[0],
        o = i.useState(Yn)[0],
        s = i.useRef(e);
    i.useEffect(function() {
        s.current = e
    }, [e]), i.useEffect(function() {
        if (e.inert) {
            document.body.classList.add(`block-interactivity-${a}`);
            var t = wn([e.lockRef.current], (e.shards || []).map(xr), !0).filter(Boolean);
            return t.forEach(function(e) {
                    return e.classList.add(`allow-interactivity-${a}`)
                }),
                function() {
                    document.body.classList.remove(`block-interactivity-${a}`), t.forEach(function(e) {
                        return e.classList.remove(`allow-interactivity-${a}`)
                    })
                }
        }
    }, [e.inert, e.lockRef.current, e.shards]);
    var c = i.useCallback(function(e, t) {
            if (`touches` in e && e.touches.length === 2 || e.type === `wheel` && e.ctrlKey) return !s.current.allowPinchZoom;
            var i = yr(e),
                a = n.current,
                o = `deltaX` in e ? e.deltaX : a[0] - i[0],
                c = `deltaY` in e ? e.deltaY : a[1] - i[1],
                l, u = e.target,
                d = Math.abs(o) > Math.abs(c) ? `h` : `v`;
            if (`touches` in e && d === `h` && u.type === `range`) return !1;
            var f = window.getSelection(),
                p = f && f.anchorNode;
            if (p && (p === u || p.contains(u))) return !1;
            var m = fr(d, u);
            if (!m) return !0;
            if (m ? l = d : (l = d === `v` ? `h` : `v`, m = fr(d, u)), !m) return !1;
            if (!r.current && `changedTouches` in e && (o || c) && (r.current = l), !l) return !0;
            var h = r.current || l;
            return vr(h, t, e, h === `h` ? o : c, !0)
        }, []),
        l = i.useCallback(function(e) {
            var n = e;
            if (!(!Tr.length || Tr[Tr.length - 1] !== o)) {
                var r = `deltaY` in n ? br(n) : yr(n),
                    i = t.current.filter(function(e) {
                        return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && Sr(e.delta, r)
                    })[0];
                if (i && i.should) {
                    n.cancelable && n.preventDefault();
                    return
                }
                if (!i) {
                    var a = (s.current.shards || []).map(xr).filter(Boolean).filter(function(e) {
                        return e.contains(n.target)
                    });
                    (a.length > 0 ? c(n, a[0]) : !s.current.noIsolation) && n.cancelable && n.preventDefault()
                }
            }
        }, []),
        u = i.useCallback(function(e, n, r, i) {
            var a = {
                name: e,
                delta: n,
                target: r,
                should: i,
                shadowParent: Dr(r)
            };
            t.current.push(a), setTimeout(function() {
                t.current = t.current.filter(function(e) {
                    return e !== a
                })
            }, 1)
        }, []),
        d = i.useCallback(function(e) {
            n.current = yr(e), r.current = void 0
        }, []),
        f = i.useCallback(function(t) {
            u(t.type, br(t), t.target, c(t, e.lockRef.current))
        }, []),
        p = i.useCallback(function(t) {
            u(t.type, yr(t), t.target, c(t, e.lockRef.current))
        }, []);
    i.useEffect(function() {
        return Tr.push(o), e.setCallbacks({
                onScrollCapture: f,
                onWheelCapture: f,
                onTouchMoveCapture: p
            }), document.addEventListener(`wheel`, l, sr), document.addEventListener(`touchmove`, l, sr), document.addEventListener(`touchstart`, d, sr),
            function() {
                Tr = Tr.filter(function(e) {
                    return e !== o
                }), document.removeEventListener(`wheel`, l, sr), document.removeEventListener(`touchmove`, l, sr), document.removeEventListener(`touchstart`, d, sr)
            }
    }, []);
    var m = e.removeScrollBar,
        h = e.inert;
    return i.createElement(i.Fragment, null, h ? i.createElement(o, {
        styles: Cr(a)
    }) : null, m ? i.createElement(ir, {
        noRelative: e.noRelative,
        gapMode: e.gapMode
    }) : null)
}

function Dr(e) {
    for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
    return t
}
var Or = Rn(zn, Er),
    kr = i.forwardRef(function(e, t) {
        return i.createElement(Vn, H({}, e, {
            ref: t,
            sideCar: Or
        }))
    });
kr.classNames = Vn.classNames;
var Ar = function(e) {
        return typeof document > `u` ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body
    },
    jr = new WeakMap,
    Mr = new WeakMap,
    Nr = {},
    Pr = 0,
    Fr = function(e) {
        return e && (e.host || Fr(e.parentNode))
    },
    Ir = function(e, t) {
        return t.map(function(t) {
            if (e.contains(t)) return t;
            var n = Fr(t);
            return n && e.contains(n) ? n : (console.error(`aria-hidden`, t, `in not contained inside`, e, `. Doing nothing`), null)
        }).filter(function(e) {
            return !!e
        })
    },
    Lr = function(e, t, n, r) {
        var i = Ir(t, Array.isArray(e) ? e : [e]);
        Nr[n] || (Nr[n] = new WeakMap);
        var a = Nr[n],
            o = [],
            s = new Set,
            c = new Set(i),
            l = function(e) {
                !e || s.has(e) || (s.add(e), l(e.parentNode))
            };
        i.forEach(l);
        var u = function(e) {
            !e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
                if (s.has(e)) u(e);
                else try {
                    var t = e.getAttribute(r),
                        i = t !== null && t !== `false`,
                        c = (jr.get(e) || 0) + 1,
                        l = (a.get(e) || 0) + 1;
                    jr.set(e, c), a.set(e, l), o.push(e), c === 1 && i && Mr.set(e, !0), l === 1 && e.setAttribute(n, `true`), i || e.setAttribute(r, `true`)
                } catch (t) {
                    console.error(`aria-hidden: cannot operate on `, e, t)
                }
            })
        };
        return u(t), s.clear(), Pr++,
            function() {
                o.forEach(function(e) {
                    var t = jr.get(e) - 1,
                        i = a.get(e) - 1;
                    jr.set(e, t), a.set(e, i), t || (Mr.has(e) || e.removeAttribute(r), Mr.delete(e)), i || e.removeAttribute(n)
                }), Pr--, Pr || (jr = new WeakMap, jr = new WeakMap, Mr = new WeakMap, Nr = {})
            }
    },
    Rr = function(e, t, n) {
        n === void 0 && (n = `data-aria-hidden`);
        var r = Array.from(Array.isArray(e) ? e : [e]),
            i = t || Ar(e);
        return i ? (r.push.apply(r, Array.from(i.querySelectorAll(`[aria-live], script`))), Lr(r, i, n, `aria-hidden`)) : function() {
            return null
        }
    },
    zr = Object.defineProperty,
    U = (e, t) => zr(e, `name`, {
        value: t,
        configurable: !0
    });

function Br(e) {
    let t = i.forwardRef((t, n) => {
        let {
            children: r,
            ...a
        } = t, o = null, s = !1, c = [];
        Jr(r) && typeof Qr == `function` && (r = Qr(r._payload)), i.Children.forEach(r, e => {
            if (Kr(e)) {
                s = !0;
                let t = e,
                    n = `child` in t.props ? t.props.child : t.props.children;
                Jr(n) && typeof Qr == `function` && (n = Qr(n._payload)), o = Ur(t, n), c.push(o ?.props ?.children)
            } else c.push(e)
        }), o ? o = i.cloneElement(o, void 0, c) : !s && i.Children.count(r) === 1 && i.isValidElement(r) && (o = r);
        let l = o ? Gr(o) : void 0,
            u = Tt(n, l);
        if (!o) {
            if (r || r === 0) throw Error(s ? Zr(e) : Xr(e));
            return r
        }
        let d = Wr(a, o.props ?? {});
        return o.type !== i.Fragment && (d.ref = n ? u : l), i.cloneElement(o, d)
    });
    return t.displayName = `${e}.Slot`, t
}
U(Br, `createSlot`);
var Vr = Symbol.for(`radix.slottable`);

function Hr(e) {
    let t = U(e => `child` in e ? e.children(e.child) : e.children, `Slottable`);
    return t.displayName = `${e}.Slottable`, t.__radixId = Vr, t
}
U(Hr, `createSlottable`);
var Ur = U((e, t) => {
    if (`child` in e.props) {
        let t = e.props.child;
        return i.isValidElement(t) ? i.cloneElement(t, void 0, e.props.children(t.props.children)) : null
    }
    return i.isValidElement(t) ? t : null
}, `getSlottableElementFromSlottable`);

function Wr(e, t) {
    let n = { ...t
    };
    for (let r in t) {
        let i = e[r],
            a = t[r];
        /^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
            let t = a(...e);
            return i(...e), t
        } : i && (n[r] = i) : r === `style` ? n[r] = { ...i,
            ...a
        } : r === `className` && (n[r] = [i, a].filter(Boolean).join(` `))
    }
    return { ...e,
        ...n
    }
}
U(Wr, `mergeProps`);

function Gr(e) {
    let t = Object.getOwnPropertyDescriptor(e.props, `ref`) ?.get,
        n = t && `isReactWarning` in t && t.isReactWarning;
    return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, `ref`) ?.get, n = t && `isReactWarning` in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}
U(Gr, `getElementRef`);

function Kr(e) {
    return i.isValidElement(e) && typeof e.type == `function` && `__radixId` in e.type && e.type.__radixId === Vr
}
U(Kr, `isSlottable`);
var qr = Symbol.for(`react.lazy`);

function Jr(e) {
    return typeof e == `object` && !!e && `$$typeof` in e && e.$$typeof === qr && `_payload` in e && Yr(e._payload)
}
U(Jr, `isLazyComponent`);

function Yr(e) {
    return typeof e == `object` && !!e && `then` in e
}
U(Yr, `isPromiseLike`);
var Xr = U(e => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, `createSlotError`),
    Zr = U(e => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, `createSlottableError`),
    Qr = i.use,
    $r = Object.defineProperty,
    W = (e, t) => $r(e, `name`, {
        value: t,
        configurable: !0
    }),
    ei = `Dialog`,
    [ti, ni] = se(ei),
    [ri, G] = ti(ei),
    ii = W(e => {
        let {
            __scopeDialog: t,
            children: n,
            open: r,
            defaultOpen: a,
            onOpenChange: o,
            modal: s = !0
        } = e, c = i.useRef(null), l = i.useRef(null), [u, d] = Qe({
            prop: r,
            defaultProp: a ?? !1,
            onChange: o,
            caller: ei
        }), [f, p] = i.useState(0), [m, h] = i.useState(0);
        return (0, D.jsx)(ri, {
            scope: t,
            triggerRef: c,
            contentRef: l,
            contentId: gt(),
            titleId: gt(),
            descriptionId: gt(),
            titlePresent: f > 0,
            descriptionPresent: m > 0,
            setTitleCount: p,
            setDescriptionCount: h,
            open: u,
            onOpenChange: d,
            onOpenToggle: i.useCallback(() => d(e => !e), [d]),
            modal: s,
            children: n
        })
    }, `Dialog`),
    ai = `DialogPortal`,
    [oi, si] = ti(ai, {
        forceMount: void 0
    }),
    ci = W(e => {
        let {
            __scopeDialog: t,
            forceMount: n,
            children: r,
            container: a
        } = e, o = G(ai, t);
        return (0, D.jsx)(oi, {
            scope: t,
            forceMount: n,
            children: i.Children.map(r, e => (0, D.jsx)(ot, {
                present: n || o.open,
                children: (0, D.jsx)(hn, {
                    asChild: !0,
                    container: a,
                    children: e
                })
            }))
        })
    }, `DialogPortal`),
    li = `DialogOverlay`,
    ui = i.forwardRef(W(function(e, t) {
        let n = si(li, e.__scopeDialog),
            {
                forceMount: r = n.forceMount,
                ...i
            } = e,
            a = G(li, e.__scopeDialog);
        return a.modal ? (0, D.jsx)(ot, {
            present: r || a.open,
            children: (0, D.jsx)(fi, { ...i,
                ref: t
            })
        }) : null
    }, `DialogOverlay`)),
    di = Br(`DialogOverlay.RemoveScroll`),
    fi = i.forwardRef(W(function(e, t) {
        let {
            __scopeDialog: n,
            ...r
        } = e, i = G(li, n), a = Tt(t, Vt());
        return (0, D.jsx)(kr, {
            as: di,
            allowPinchZoom: !0,
            shards: [i.contentRef],
            children: (0, D.jsx)(k.div, {
                "data-state": wi(i.open),
                ...r,
                ref: a,
                style: {
                    pointerEvents: `auto`,
                    ...r.style
                }
            })
        })
    }, `DialogOverlayImpl`)),
    pi = `DialogContent`,
    mi = i.forwardRef(W(function(e, t) {
        let n = si(pi, e.__scopeDialog),
            {
                forceMount: r = n.forceMount,
                ...i
            } = e,
            a = G(pi, e.__scopeDialog);
        return (0, D.jsx)(ot, {
            present: r || a.open,
            children: a.modal ? (0, D.jsx)(hi, { ...i,
                ref: t
            }) : (0, D.jsx)(gi, { ...i,
                ref: t
            })
        })
    }, `DialogContent`)),
    hi = i.forwardRef(W(function(e, t) {
        let n = G(pi, e.__scopeDialog),
            r = i.useRef(null),
            a = Tt(t, n.contentRef, r);
        return i.useEffect(() => {
            let e = r.current;
            if (e) return Rr(e)
        }, []), (0, D.jsx)(_i, { ...e,
            ref: a,
            trapFocus: n.open,
            disableOutsidePointerEvents: n.open,
            onCloseAutoFocus: L(e.onCloseAutoFocus, e => {
                e.preventDefault(), n.triggerRef.current ?.focus()
            }),
            onPointerDownOutside: L(e.onPointerDownOutside, e => {
                let t = e.detail.originalEvent,
                    n = t.button === 0 && t.ctrlKey === !0;
                (t.button === 2 || n) && e.preventDefault()
            }),
            onFocusOutside: L(e.onFocusOutside, e => e.preventDefault())
        })
    }, `DialogContentModal`)),
    gi = i.forwardRef(W(function(e, t) {
        let n = G(pi, e.__scopeDialog),
            r = i.useRef(!1),
            a = i.useRef(!1);
        return (0, D.jsx)(_i, { ...e,
            ref: t,
            trapFocus: !1,
            disableOutsidePointerEvents: !1,
            onCloseAutoFocus: t => {
                e.onCloseAutoFocus ?.(t), t.defaultPrevented || (r.current || n.triggerRef.current ?.focus(), t.preventDefault()), r.current = !1, a.current = !1
            },
            onInteractOutside: t => {
                e.onInteractOutside ?.(t), t.defaultPrevented || (r.current = !0, t.detail.originalEvent.type === `pointerdown` && (a.current = !0));
                let i = t.target;
                n.triggerRef.current ?.contains(i) && t.preventDefault(), t.detail.originalEvent.type === `focusin` && a.current && t.preventDefault()
            }
        })
    }, `DialogContentNonModal`)),
    _i = i.forwardRef(W(function(e, t) {
        let {
            __scopeDialog: n,
            trapFocus: r,
            onOpenAutoFocus: i,
            onCloseAutoFocus: a,
            ...o
        } = e, s = G(pi, n);
        return xn(), (0, D.jsx)(D.Fragment, {
            children: (0, D.jsx)(nn, {
                asChild: !0,
                loop: !0,
                trapped: r,
                onMountAutoFocus: i,
                onUnmountAutoFocus: a,
                children: (0, D.jsx)(Bt, {
                    role: `dialog`,
                    id: s.contentId,
                    "aria-describedby": s.descriptionPresent ? s.descriptionId : void 0,
                    "aria-labelledby": s.titlePresent ? s.titleId : void 0,
                    "data-state": wi(s.open),
                    ...o,
                    ref: t,
                    deferPointerDownOutside: !0,
                    onDismiss: () => s.onOpenChange(!1)
                })
            })
        })
    }, `DialogContentImpl`)),
    vi = `DialogTitle`,
    yi = i.forwardRef(W(function(e, t) {
        let {
            __scopeDialog: n,
            ...r
        } = e, i = G(vi, n), {
            setTitleCount: a
        } = i;
        return R(() => (a(e => e + 1), () => a(e => e - 1)), [a]), (0, D.jsx)(k.h2, {
            id: i.titleId,
            ...r,
            ref: t
        })
    }, `DialogTitle`)),
    bi = `DialogDescription`,
    xi = i.forwardRef(W(function(e, t) {
        let {
            __scopeDialog: n,
            ...r
        } = e, i = G(bi, n), {
            setDescriptionCount: a
        } = i;
        return R(() => (a(e => e + 1), () => a(e => e - 1)), [a]), (0, D.jsx)(k.p, {
            id: i.descriptionId,
            ...r,
            ref: t
        })
    }, `DialogDescription`)),
    Si = `DialogClose`,
    Ci = i.forwardRef(W(function(e, t) {
        let {
            __scopeDialog: n,
            ...r
        } = e, i = G(Si, n);
        return (0, D.jsx)(k.button, {
            type: `button`,
            ...r,
            ref: t,
            onClick: L(e.onClick, () => i.onOpenChange(!1))
        })
    }, `DialogClose`));

function wi(e) {
    return e ? `open` : `closed`
}
W(wi, `getState`);
var Ti = Object.defineProperty,
    Ei = (e, t) => Ti(e, `name`, {
        value: t,
        configurable: !0
    });

function Di(e, t) {
    if (typeof e == `function`) return e(t);
    e != null && (e.current = t)
}
Ei(Di, `setRef`);

function Oi(...e) {
    return t => {
        let n = !1,
            r = e.map(e => {
                let r = Di(e, t);
                return !n && typeof r == `function` && (n = !0), r
            });
        if (n) return () => {
            for (let t = 0; t < r.length; t++) {
                let n = r[t];
                typeof n == `function` ? n() : Di(e[t], null)
            }
        }
    }
}
Ei(Oi, `composeRefs`);

function ki(...e) {
    return i.useCallback(Oi(...e), e)
}
Ei(ki, `useComposedRefs`);
var Ai = Object.defineProperty,
    ji = (e, t) => Ai(e, `name`, {
        value: t,
        configurable: !0
    }),
    Mi = !1;

function Ni() {
    let [e, t] = i.useState(Mi);
    return i.useEffect(() => {
        Mi || (Mi = !0, t(!0))
    }, []), e
}
ji(Ni, `useIsHydrated`);
var Pi = i.useSyncExternalStore;

function Fi() {
    return () => {}
}
ji(Fi, `subscribe`);

function Ii() {
    return Pi(Fi, () => !0, () => !1)
}
ji(Ii, `useIsHydratedModern`);
var Li = typeof Pi == `function` ? Ii : Ni,
    Ri = Object.defineProperty,
    zi = (e, t) => Ri(e, `name`, {
        value: t,
        configurable: !0
    }),
    Bi = `rovingFocusGroup.onEntryFocus`,
    Vi = {
        bubbles: !1,
        cancelable: !0
    },
    Hi = `RovingFocusGroup`,
    [Ui, Wi, Gi] = Ee(Hi),
    [Ki, qi] = se(Hi, [Gi]),
    [Ji, Yi] = Ki(Hi),
    Xi = i.forwardRef(zi(function(e, t) {
        return (0, D.jsx)(Ui.Provider, {
            scope: e.__scopeRovingFocusGroup,
            children: (0, D.jsx)(Ui.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, D.jsx)(Zi, { ...e,
                    ref: t
                })
            })
        })
    }, `RovingFocusGroup`)),
    Zi = i.forwardRef(zi(function(e, t) {
        let {
            __scopeRovingFocusGroup: n,
            orientation: r,
            loop: a = !1,
            dir: o,
            currentTabStopId: s,
            defaultCurrentTabStopId: c,
            onCurrentTabStopIdChange: l,
            onEntryFocus: u,
            preventScrollOnEntryFocus: d = !1,
            ...f
        } = e, p = i.useRef(null), m = ki(t, p), h = bt(o), [g, _] = Qe({
            prop: s,
            defaultProp: c ?? null,
            onChange: l,
            caller: Hi
        }), [v, y] = i.useState(!1), b = Nt(u), x = Wi(n), S = i.useRef(!1), [C, w] = i.useState(0);
        return i.useEffect(() => {
            let e = p.current;
            if (e) return e.addEventListener(Bi, b), () => e.removeEventListener(Bi, b)
        }, [b]), (0, D.jsx)(Ji, {
            scope: n,
            orientation: r,
            dir: h,
            loop: a,
            currentTabStopId: g,
            onItemFocus: i.useCallback(e => _(e), [_]),
            onItemShiftTab: i.useCallback(() => y(!0), []),
            onFocusableItemAdd: i.useCallback(() => w(e => e + 1), []),
            onFocusableItemRemove: i.useCallback(() => w(e => e - 1), []),
            children: (0, D.jsx)(k.div, {
                tabIndex: v || C === 0 ? -1 : 0,
                "data-orientation": r,
                ...f,
                ref: m,
                style: {
                    outline: `none`,
                    ...e.style
                },
                onMouseDown: L(e.onMouseDown, () => {
                    S.current = !0
                }),
                onFocus: L(e.onFocus, e => {
                    let t = !S.current;
                    if (e.target === e.currentTarget && t && !v) {
                        let t = new CustomEvent(Bi, Vi);
                        if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
                            let e = x().filter(e => e.focusable);
                            ra([e.find(e => e.active), e.find(e => e.id === g), ...e].filter(Boolean).map(e => e.ref.current), d)
                        }
                    }
                    S.current = !1
                }),
                onBlur: L(e.onBlur, () => y(!1))
            })
        })
    }, `RovingFocusGroupImpl`)),
    Qi = `RovingFocusGroupItem`,
    $i = i.forwardRef(zi(function(e, t) {
        let {
            __scopeRovingFocusGroup: n,
            focusable: r = !0,
            active: a = !1,
            tabStopId: o,
            children: s,
            ...c
        } = e, l = gt(), u = o || l, d = Yi(Qi, n), f = d.currentTabStopId === u, p = Wi(n), {
            onFocusableItemAdd: m,
            onFocusableItemRemove: h,
            currentTabStopId: g
        } = d, _ = Li();
        return R(() => {
            if (!(!_ || !r)) return m(), () => h()
        }, [_, r, m, h]), i.useEffect(() => {
            if (!(_ || !r)) return m(), () => h()
        }, [_, r, m, h]), (0, D.jsx)(Ui.ItemSlot, {
            scope: n,
            id: u,
            focusable: r,
            active: a,
            children: (0, D.jsx)(k.span, {
                tabIndex: f ? 0 : -1,
                "data-orientation": d.orientation,
                ...c,
                ref: t,
                onMouseDown: L(e.onMouseDown, e => {
                    r ? d.onItemFocus(u) : e.preventDefault()
                }),
                onFocus: L(e.onFocus, () => d.onItemFocus(u)),
                onKeyDown: L(e.onKeyDown, e => {
                    if (e.key === `Tab` && e.shiftKey) {
                        d.onItemShiftTab();
                        return
                    }
                    if (e.target !== e.currentTarget) return;
                    let t = na(e, d.orientation, d.dir);
                    if (t !== void 0) {
                        if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
                        e.preventDefault();
                        let n = p().filter(e => e.focusable).map(e => e.ref.current);
                        if (t === `last`) n.reverse();
                        else if (t === `prev` || t === `next`) {
                            t === `prev` && n.reverse();
                            let r = n.indexOf(e.currentTarget);
                            n = d.loop ? ia(n, r + 1) : n.slice(r + 1)
                        }
                        setTimeout(() => ra(n))
                    }
                }),
                children: typeof s == `function` ? s({
                    isCurrentTabStop: f,
                    hasTabStop: g != null
                }) : s
            })
        })
    }, `RovingFocusGroupItem`)),
    ea = {
        ArrowLeft: `prev`,
        ArrowUp: `prev`,
        ArrowRight: `next`,
        ArrowDown: `next`,
        PageUp: `first`,
        Home: `first`,
        PageDown: `last`,
        End: `last`
    };

function ta(e, t) {
    return t === `rtl` ? e === `ArrowLeft` ? `ArrowRight` : e === `ArrowRight` ? `ArrowLeft` : e : e
}
zi(ta, `getDirectionAwareKey`);

function na(e, t, n) {
    let r = ta(e.key, n);
    if (!(t === `vertical` && [`ArrowLeft`, `ArrowRight`].includes(r)) && !(t === `horizontal` && [`ArrowUp`, `ArrowDown`].includes(r))) return ea[r]
}
zi(na, `getFocusIntent`);

function ra(e, t = !1) {
    let n = document.activeElement;
    for (let r of e)
        if (r === n || (r.focus({
                preventScroll: t
            }), document.activeElement !== n)) return
}
zi(ra, `focusFirst`);

function ia(e, t) {
    return e.map((n, r) => e[(t + r) % e.length])
}
zi(ia, `wrapArray`);
var aa = Xi,
    oa = $i,
    sa = Object.defineProperty,
    K = (e, t) => sa(e, `name`, {
        value: t,
        configurable: !0
    }),
    ca = `Progress`,
    la = 100,
    [ua, da] = se(ca),
    [fa, pa] = ua(ca),
    ma = i.forwardRef(K(function(e, t) {
        let {
            __scopeProgress: n,
            value: r = null,
            max: i,
            getValueLabel: a = _a,
            ...o
        } = e;
        (i || i === 0) && !ba(i) && console.error(Sa(`${i}`, `Progress`));
        let s = ba(i) ? i : la;
        r !== null && !xa(r, s) && console.error(Ca(`${r}`, `Progress`));
        let c = xa(r, s) ? r : null,
            l = ya(c) ? a(c, s) : void 0;
        return (0, D.jsx)(fa, {
            scope: n,
            value: c,
            max: s,
            children: (0, D.jsx)(k.div, {
                "aria-valuemax": s,
                "aria-valuemin": 0,
                "aria-valuenow": ya(c) ? c : void 0,
                "aria-valuetext": l,
                role: `progressbar`,
                "data-state": va(c, s),
                "data-value": c ?? void 0,
                "data-max": s,
                ...o,
                ref: t
            })
        })
    }, `Progress`)),
    ha = `ProgressIndicator`,
    ga = i.forwardRef(K(function(e, t) {
        let {
            __scopeProgress: n,
            ...r
        } = e, i = pa(ha, n);
        return (0, D.jsx)(k.div, {
            "data-state": va(i.value, i.max),
            "data-value": i.value ?? void 0,
            "data-max": i.max,
            ...r,
            ref: t
        })
    }, `ProgressIndicator`));

function _a(e, t) {
    return `${Math.round(e/t*100)}%`
}
K(_a, `defaultGetValueLabel`);

function va(e, t) {
    return e == null ? `indeterminate` : e === t ? `complete` : `loading`
}
K(va, `getProgressState`);

function ya(e) {
    return typeof e == `number`
}
K(ya, `isNumber`);

function ba(e) {
    return ya(e) && !isNaN(e) && e > 0
}
K(ba, `isValidMaxNumber`);

function xa(e, t) {
    return ya(e) && !isNaN(e) && e <= t && e >= 0
}
K(xa, `isValidValueNumber`);

function Sa(e, t) {
    return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${la}\`.`
}
K(Sa, `getInvalidMaxError`);

function Ca(e, t) {
    return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${la} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`
}
K(Ca, `getInvalidValueError`);
var wa = ma,
    Ta = ga,
    Ea = Object.defineProperty,
    Da = (e, t) => Ea(e, `name`, {
        value: t,
        configurable: !0
    }),
    Oa = `Tabs`,
    [ka, Aa] = se(Oa, [qi]),
    ja = qi(),
    [Ma, Na] = ka(Oa),
    Pa = i.forwardRef(Da(function(e, t) {
        let {
            __scopeTabs: n,
            value: r,
            onValueChange: i,
            defaultValue: a,
            orientation: o = `horizontal`,
            dir: s,
            activationMode: c = `automatic`,
            ...l
        } = e, u = bt(s), [d, f] = Qe({
            prop: r,
            onChange: i,
            defaultProp: a ?? ``,
            caller: Oa
        });
        return (0, D.jsx)(Ma, {
            scope: n,
            baseId: gt(),
            value: d,
            onValueChange: f,
            orientation: o,
            dir: u,
            activationMode: c,
            children: (0, D.jsx)(k.div, {
                dir: u,
                "data-orientation": o,
                ...l,
                ref: t
            })
        })
    }, `Tabs`)),
    Fa = `TabsList`,
    Ia = i.forwardRef(Da(function(e, t) {
        let {
            __scopeTabs: n,
            loop: r = !0,
            ...i
        } = e, a = Na(Fa, n), o = ja(n);
        return (0, D.jsx)(aa, {
            asChild: !0,
            ...o,
            orientation: a.orientation,
            dir: a.dir,
            loop: r,
            children: (0, D.jsx)(k.div, {
                role: `tablist`,
                "aria-orientation": a.orientation,
                ...i,
                ref: t
            })
        })
    }, `TabsList`)),
    La = `TabsTrigger`,
    Ra = i.forwardRef(Da(function(e, t) {
        let {
            __scopeTabs: n,
            value: r,
            disabled: i = !1,
            ...a
        } = e, o = Na(La, n), s = ja(n), c = za(o.baseId, r), l = Ba(o.baseId, r), u = r === o.value;
        return (0, D.jsx)(oa, {
            asChild: !0,
            ...s,
            focusable: !i,
            active: u,
            children: (0, D.jsx)(k.button, {
                type: `button`,
                role: `tab`,
                "aria-selected": u,
                "aria-controls": l,
                "data-state": u ? `active` : `inactive`,
                "data-disabled": i ? `` : void 0,
                disabled: i,
                id: c,
                ...a,
                ref: t,
                onMouseDown: L(e.onMouseDown, e => {
                    !i && e.button === 0 && e.ctrlKey === !1 ? o.onValueChange(r) : e.preventDefault()
                }),
                onKeyDown: L(e.onKeyDown, e => {
                    i || e.target !== e.currentTarget || [` `, `Enter`].includes(e.key) && o.onValueChange(r)
                }),
                onFocus: L(e.onFocus, () => {
                    let e = o.activationMode !== `manual`;
                    !u && !i && e && o.onValueChange(r)
                })
            })
        })
    }, `TabsTrigger`));

function za(e, t) {
    return `${e}-trigger-${t}`
}
Da(za, `makeTriggerId`);

function Ba(e, t) {
    return `${e}-content-${t}`
}
Da(Ba, `makeContentId`);
var Va = Pa,
    Ha = Ia,
    Ua = Ra,
    Wa = (e, t) => {
        let n = Array(e.length + t.length);
        for (let t = 0; t < e.length; t++) n[t] = e[t];
        for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
        return n
    },
    Ga = (e, t) => ({
        classGroupId: e,
        validator: t
    }),
    Ka = (e = new Map, t = null, n) => ({
        nextPart: e,
        validators: t,
        classGroupId: n
    }),
    qa = `-`,
    Ja = [],
    Ya = `arbitrary..`,
    Xa = e => {
        let t = $a(e),
            {
                conflictingClassGroups: n,
                conflictingClassGroupModifiers: r
            } = e;
        return {
            getClassGroupId: e => {
                if (e.startsWith(`[`) && e.endsWith(`]`)) return Qa(e);
                let n = e.split(qa);
                return Za(n, +(n[0] === `` && n.length > 1), t)
            },
            getConflictingClassGroupIds: (e, t) => {
                if (t) {
                    let t = r[e],
                        i = n[e];
                    return t ? i ? Wa(i, t) : t : i || Ja
                }
                return n[e] || Ja
            }
        }
    },
    Za = (e, t, n) => {
        if (e.length - t === 0) return n.classGroupId;
        let r = e[t],
            i = n.nextPart.get(r);
        if (i) {
            let n = Za(e, t + 1, i);
            if (n) return n
        }
        let a = n.validators;
        if (a === null) return;
        let o = t === 0 ? e.join(qa) : e.slice(t).join(qa),
            s = a.length;
        for (let e = 0; e < s; e++) {
            let t = a[e];
            if (t.validator(o)) return t.classGroupId
        }
    },
    Qa = e => e.slice(1, -1).indexOf(`:`) === -1 ? void 0 : (() => {
        let t = e.slice(1, -1),
            n = t.indexOf(`:`),
            r = t.slice(0, n);
        return r ? Ya + r : void 0
    })(),
    $a = e => {
        let {
            theme: t,
            classGroups: n
        } = e;
        return eo(n, t)
    },
    eo = (e, t) => {
        let n = Ka();
        for (let r in e) {
            let i = e[r];
            to(i, n, r, t)
        }
        return n
    },
    to = (e, t, n, r) => {
        let i = e.length;
        for (let a = 0; a < i; a++) {
            let i = e[a];
            no(i, t, n, r)
        }
    },
    no = (e, t, n, r) => {
        if (typeof e == `string`) {
            ro(e, t, n);
            return
        }
        if (typeof e == `function`) {
            io(e, t, n, r);
            return
        }
        ao(e, t, n, r)
    },
    ro = (e, t, n) => {
        let r = e === `` ? t : oo(t, e);
        r.classGroupId = n
    },
    io = (e, t, n, r) => {
        if (so(e)) {
            to(e(r), t, n, r);
            return
        }
        t.validators === null && (t.validators = []), t.validators.push(Ga(n, e))
    },
    ao = (e, t, n, r) => {
        let i = Object.entries(e),
            a = i.length;
        for (let e = 0; e < a; e++) {
            let [a, o] = i[e];
            to(o, oo(t, a), n, r)
        }
    },
    oo = (e, t) => {
        let n = e,
            r = t.split(qa),
            i = r.length;
        for (let e = 0; e < i; e++) {
            let t = r[e],
                i = n.nextPart.get(t);
            i || (i = Ka(), n.nextPart.set(t, i)), n = i
        }
        return n
    },
    so = e => `isThemeGetter` in e && e.isThemeGetter === !0,
    co = e => {
        if (e < 1) return {
            get: () => void 0,
            set: () => {}
        };
        let t = 0,
            n = Object.create(null),
            r = Object.create(null),
            i = (i, a) => {
                n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null))
            };
        return {
            get(e) {
                let t = n[e];
                if (t !== void 0) return t;
                if ((t = r[e]) !== void 0) return i(e, t), t
            },
            set(e, t) {
                e in n ? n[e] = t : i(e, t)
            }
        }
    },
    lo = `!`,
    uo = `:`,
    fo = [],
    po = (e, t, n, r, i) => ({
        modifiers: e,
        hasImportantModifier: t,
        baseClassName: n,
        maybePostfixModifierPosition: r,
        isExternal: i
    }),
    mo = e => {
        let {
            prefix: t,
            experimentalParseClassName: n
        } = e, r = e => {
            let t = [],
                n = 0,
                r = 0,
                i = 0,
                a, o = e.length;
            for (let s = 0; s < o; s++) {
                let o = e[s];
                if (n === 0 && r === 0) {
                    if (o === uo) {
                        t.push(e.slice(i, s)), i = s + 1;
                        continue
                    }
                    if (o === `/`) {
                        a = s;
                        continue
                    }
                }
                o === `[` ? n++ : o === `]` ? n-- : o === `(` ? r++ : o === `)` && r--
            }
            let s = t.length === 0 ? e : e.slice(i),
                c = s,
                l = !1;
            s.endsWith(lo) ? (c = s.slice(0, -1), l = !0) : s.startsWith(lo) && (c = s.slice(1), l = !0);
            let u = a && a > i ? a - i : void 0;
            return po(t, l, c, u)
        };
        if (t) {
            let e = t + uo,
                n = r;
            r = t => t.startsWith(e) ? n(t.slice(e.length)) : po(fo, !1, t, void 0, !0)
        }
        if (n) {
            let e = r;
            r = t => n({
                className: t,
                parseClassName: e
            })
        }
        return r
    },
    ho = e => {
        let t = new Map;
        return e.orderSensitiveModifiers.forEach((e, n) => {
            t.set(e, 1e6 + n)
        }), e => {
            let n = [],
                r = [];
            for (let i = 0; i < e.length; i++) {
                let a = e[i],
                    o = a[0] === `[`,
                    s = t.has(a);
                o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a)
            }
            return r.length > 0 && (r.sort(), n.push(...r)), n
        }
    },
    go = e => ({
        cache: co(e.cacheSize),
        parseClassName: mo(e),
        sortModifiers: ho(e),
        postfixLookupClassGroupIds: _o(e),
        ...Xa(e)
    }),
    _o = e => {
        let t = Object.create(null),
            n = e.postfixLookupClassGroups;
        if (n)
            for (let e = 0; e < n.length; e++) t[n[e]] = !0;
        return t
    },
    vo = /\s+/,
    yo = (e, t) => {
        let {
            parseClassName: n,
            getClassGroupId: r,
            getConflictingClassGroupIds: i,
            sortModifiers: a,
            postfixLookupClassGroupIds: o
        } = t, s = [], c = e.trim().split(vo), l = ``;
        for (let e = c.length - 1; e >= 0; --e) {
            let t = c[e],
                {
                    isExternal: u,
                    modifiers: d,
                    hasImportantModifier: f,
                    baseClassName: p,
                    maybePostfixModifierPosition: m
                } = n(t);
            if (u) {
                l = t + (l.length > 0 ? ` ` + l : l);
                continue
            }
            let h = !!m,
                g;
            if (h) {
                g = r(p.substring(0, m));
                let e = g && o[g] ? r(p) : void 0;
                e && e !== g && (g = e, h = !1)
            } else g = r(p);
            if (!g) {
                if (!h) {
                    l = t + (l.length > 0 ? ` ` + l : l);
                    continue
                }
                if (g = r(p), !g) {
                    l = t + (l.length > 0 ? ` ` + l : l);
                    continue
                }
                h = !1
            }
            let _ = d.length === 0 ? `` : d.length === 1 ? d[0] : a(d).join(`:`),
                v = f ? _ + lo : _,
                y = v + g;
            if (s.indexOf(y) > -1) continue;
            s.push(y);
            let b = i(g, h);
            for (let e = 0; e < b.length; ++e) {
                let t = b[e];
                s.push(v + t)
            }
            l = t + (l.length > 0 ? ` ` + l : l)
        }
        return l
    },
    bo = (...e) => {
        let t = 0,
            n, r, i = ``;
        for (; t < e.length;)(n = e[t++]) && (r = xo(n)) && (i && (i += ` `), i += r);
        return i
    },
    xo = e => {
        if (typeof e == `string`) return e;
        let t, n = ``;
        for (let r = 0; r < e.length; r++) e[r] && (t = xo(e[r])) && (n && (n += ` `), n += t);
        return n
    },
    So = (e, ...t) => {
        let n, r, i, a, o = o => (n = go(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)),
            s = e => {
                let t = r(e);
                if (t) return t;
                let a = yo(e, n);
                return i(e, a), a
            };
        return a = o, (...e) => a(bo(...e))
    },
    Co = [],
    q = e => {
        let t = t => t[e] || Co;
        return t.isThemeGetter = !0, t
    },
    wo = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
    To = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
    Eo = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
    Do = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    Oo = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    ko = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
    Ao = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    jo = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
    Mo = e => Eo.test(e),
    J = e => !!e && !Number.isNaN(Number(e)),
    Y = e => !!e && Number.isInteger(Number(e)),
    No = e => e.endsWith(`%`) && J(e.slice(0, -1)),
    Po = e => Do.test(e),
    Fo = () => !0,
    Io = e => Oo.test(e) && !ko.test(e),
    Lo = () => !1,
    Ro = e => Ao.test(e),
    zo = e => jo.test(e),
    Bo = e => !X(e) && !Z(e),
    Vo = e => e.startsWith(`@container`) && (e[10] === `/` && e[11] !== void 0 || e[11] === `s` && e[16] !== void 0 && e.startsWith(`-size/`, 10) || e[11] === `n` && e[18] !== void 0 && e.startsWith(`-normal/`, 10)),
    Ho = e => rs(e, ss, Lo),
    X = e => wo.test(e),
    Uo = e => rs(e, cs, Io),
    Wo = e => rs(e, ls, J),
    Go = e => rs(e, ds, Fo),
    Ko = e => rs(e, us, Lo),
    qo = e => rs(e, as, Lo),
    Jo = e => rs(e, os, zo),
    Yo = e => rs(e, fs, Ro),
    Z = e => To.test(e),
    Xo = e => is(e, cs),
    Zo = e => is(e, us),
    Qo = e => is(e, as),
    $o = e => is(e, ss),
    es = e => is(e, os),
    ts = e => is(e, fs, !0),
    ns = e => is(e, ds, !0),
    rs = (e, t, n) => {
        let r = wo.exec(e);
        return r ? r[1] ? t(r[1]) : n(r[2]) : !1
    },
    is = (e, t, n = !1) => {
        let r = To.exec(e);
        return r ? r[1] ? t(r[1]) : n : !1
    },
    as = e => e === `position` || e === `percentage`,
    os = e => e === `image` || e === `url`,
    ss = e => e === `length` || e === `size` || e === `bg-size`,
    cs = e => e === `length`,
    ls = e => e === `number`,
    us = e => e === `family-name`,
    ds = e => e === `number` || e === `weight`,
    fs = e => e === `shadow`,
    ps = So(() => {
        let e = q(`color`),
            t = q(`font`),
            n = q(`text`),
            r = q(`font-weight`),
            i = q(`tracking`),
            a = q(`leading`),
            o = q(`breakpoint`),
            s = q(`container`),
            c = q(`spacing`),
            l = q(`radius`),
            u = q(`shadow`),
            d = q(`inset-shadow`),
            f = q(`text-shadow`),
            p = q(`drop-shadow`),
            m = q(`blur`),
            h = q(`perspective`),
            g = q(`aspect`),
            _ = q(`ease`),
            v = q(`animate`),
            y = () => [`auto`, `avoid`, `all`, `avoid-page`, `page`, `left`, `right`, `column`],
            b = () => [`center`, `top`, `bottom`, `left`, `right`, `top-left`, `left-top`, `top-right`, `right-top`, `bottom-right`, `right-bottom`, `bottom-left`, `left-bottom`],
            x = () => [...b(), Z, X],
            S = () => [`auto`, `hidden`, `clip`, `visible`, `scroll`],
            C = () => [`auto`, `contain`, `none`],
            w = () => [Z, X, c],
            T = () => [Mo, `full`, `auto`, ...w()],
            E = () => [Y, `none`, `subgrid`, Z, X],
            ee = () => [`auto`, {
                span: [`full`, Y, Z, X]
            }, Y, Z, X],
            te = () => [Y, `auto`, Z, X],
            ne = () => [`auto`, `min`, `max`, `fr`, Z, X],
            re = () => [`start`, `end`, `center`, `between`, `around`, `evenly`, `stretch`, `baseline`, `center-safe`, `end-safe`],
            D = () => [`start`, `end`, `center`, `stretch`, `center-safe`, `end-safe`],
            O = () => [`auto`, ...w()],
            ie = () => [Mo, `auto`, `full`, `dvw`, `dvh`, `lvw`, `lvh`, `svw`, `svh`, `min`, `max`, `fit`, ...w()],
            k = () => [Mo, `screen`, `full`, `dvw`, `lvw`, `svw`, `min`, `max`, `fit`, ...w()],
            ae = () => [Mo, `screen`, `full`, `lh`, `dvh`, `lvh`, `svh`, `min`, `max`, `fit`, ...w()],
            A = () => [e, Z, X],
            j = () => [...b(), Qo, qo, {
                position: [Z, X]
            }],
            oe = () => [`no-repeat`, {
                repeat: [``, `x`, `y`, `space`, `round`]
            }],
            se = () => [`auto`, `cover`, `contain`, $o, Ho, {
                size: [Z, X]
            }],
            ce = () => [No, Xo, Uo],
            M = () => [``, `none`, `full`, l, Z, X],
            N = () => [``, J, Xo, Uo],
            le = () => [`solid`, `dashed`, `dotted`, `double`],
            ue = () => [`normal`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`, `hue`, `saturation`, `color`, `luminosity`],
            P = () => [J, No, Qo, qo],
            de = () => [``, `none`, m, Z, X],
            F = () => [`none`, J, Z, X],
            fe = () => [`none`, J, Z, X],
            pe = () => [J, Z, X],
            me = () => [Mo, `full`, ...w()];
        return {
            cacheSize: 500,
            theme: {
                animate: [`spin`, `ping`, `pulse`, `bounce`],
                aspect: [`video`],
                blur: [Po],
                breakpoint: [Po],
                color: [Fo],
                container: [Po],
                "drop-shadow": [Po],
                ease: [`in`, `out`, `in-out`],
                font: [Bo],
                "font-weight": [`thin`, `extralight`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, `black`],
                "inset-shadow": [Po],
                leading: [`none`, `tight`, `snug`, `normal`, `relaxed`, `loose`],
                perspective: [`dramatic`, `near`, `normal`, `midrange`, `distant`, `none`],
                radius: [Po],
                shadow: [Po],
                spacing: [`px`, J],
                text: [Po],
                "text-shadow": [Po],
                tracking: [`tighter`, `tight`, `normal`, `wide`, `wider`, `widest`]
            },
            classGroups: {
                aspect: [{
                    aspect: [`auto`, `square`, Mo, X, Z, g]
                }],
                container: [`container`],
                "container-type": [{
                    "@container": [``, `normal`, `size`, Z, X]
                }],
                "container-named": [Vo],
                columns: [{
                    columns: [J, X, Z, s]
                }],
                "break-after": [{
                    "break-after": y()
                }],
                "break-before": [{
                    "break-before": y()
                }],
                "break-inside": [{
                    "break-inside": [`auto`, `avoid`, `avoid-page`, `avoid-column`]
                }],
                "box-decoration": [{
                    "box-decoration": [`slice`, `clone`]
                }],
                box: [{
                    box: [`border`, `content`]
                }],
                display: [`block`, `inline-block`, `inline`, `flex`, `inline-flex`, `table`, `inline-table`, `table-caption`, `table-cell`, `table-column`, `table-column-group`, `table-footer-group`, `table-header-group`, `table-row-group`, `table-row`, `flow-root`, `grid`, `inline-grid`, `contents`, `list-item`, `hidden`],
                sr: [`sr-only`, `not-sr-only`],
                float: [{
                    float: [`right`, `left`, `none`, `start`, `end`]
                }],
                clear: [{
                    clear: [`left`, `right`, `both`, `none`, `start`, `end`]
                }],
                isolation: [`isolate`, `isolation-auto`],
                "object-fit": [{
                    object: [`contain`, `cover`, `fill`, `none`, `scale-down`]
                }],
                "object-position": [{
                    object: x()
                }],
                overflow: [{
                    overflow: S()
                }],
                "overflow-x": [{
                    "overflow-x": S()
                }],
                "overflow-y": [{
                    "overflow-y": S()
                }],
                overscroll: [{
                    overscroll: C()
                }],
                "overscroll-x": [{
                    "overscroll-x": C()
                }],
                "overscroll-y": [{
                    "overscroll-y": C()
                }],
                position: [`static`, `fixed`, `absolute`, `relative`, `sticky`],
                inset: [{
                    inset: T()
                }],
                "inset-x": [{
                    "inset-x": T()
                }],
                "inset-y": [{
                    "inset-y": T()
                }],
                start: [{
                    "inset-s": T(),
                    start: T()
                }],
                end: [{
                    "inset-e": T(),
                    end: T()
                }],
                "inset-bs": [{
                    "inset-bs": T()
                }],
                "inset-be": [{
                    "inset-be": T()
                }],
                top: [{
                    top: T()
                }],
                right: [{
                    right: T()
                }],
                bottom: [{
                    bottom: T()
                }],
                left: [{
                    left: T()
                }],
                visibility: [`visible`, `invisible`, `collapse`],
                z: [{
                    z: [Y, `auto`, Z, X]
                }],
                basis: [{
                    basis: [Mo, `full`, `auto`, s, ...w()]
                }],
                "flex-direction": [{
                    flex: [`row`, `row-reverse`, `col`, `col-reverse`]
                }],
                "flex-wrap": [{
                    flex: [`nowrap`, `wrap`, `wrap-reverse`]
                }],
                flex: [{
                    flex: [J, Mo, `auto`, `initial`, `none`, X]
                }],
                grow: [{
                    grow: [``, J, Z, X]
                }],
                shrink: [{
                    shrink: [``, J, Z, X]
                }],
                order: [{
                    order: [Y, `first`, `last`, `none`, Z, X]
                }],
                "grid-cols": [{
                    "grid-cols": E()
                }],
                "col-start-end": [{
                    col: ee()
                }],
                "col-start": [{
                    "col-start": te()
                }],
                "col-end": [{
                    "col-end": te()
                }],
                "grid-rows": [{
                    "grid-rows": E()
                }],
                "row-start-end": [{
                    row: ee()
                }],
                "row-start": [{
                    "row-start": te()
                }],
                "row-end": [{
                    "row-end": te()
                }],
                "grid-flow": [{
                    "grid-flow": [`row`, `col`, `dense`, `row-dense`, `col-dense`]
                }],
                "auto-cols": [{
                    "auto-cols": ne()
                }],
                "auto-rows": [{
                    "auto-rows": ne()
                }],
                gap: [{
                    gap: w()
                }],
                "gap-x": [{
                    "gap-x": w()
                }],
                "gap-y": [{
                    "gap-y": w()
                }],
                "justify-content": [{
                    justify: [...re(), `normal`]
                }],
                "justify-items": [{
                    "justify-items": [...D(), `normal`]
                }],
                "justify-self": [{
                    "justify-self": [`auto`, ...D()]
                }],
                "align-content": [{
                    content: [`normal`, ...re()]
                }],
                "align-items": [{
                    items: [...D(), {
                        baseline: [``, `last`]
                    }]
                }],
                "align-self": [{
                    self: [`auto`, ...D(), {
                        baseline: [``, `last`]
                    }]
                }],
                "place-content": [{
                    "place-content": re()
                }],
                "place-items": [{
                    "place-items": [...D(), `baseline`]
                }],
                "place-self": [{
                    "place-self": [`auto`, ...D()]
                }],
                p: [{
                    p: w()
                }],
                px: [{
                    px: w()
                }],
                py: [{
                    py: w()
                }],
                ps: [{
                    ps: w()
                }],
                pe: [{
                    pe: w()
                }],
                pbs: [{
                    pbs: w()
                }],
                pbe: [{
                    pbe: w()
                }],
                pt: [{
                    pt: w()
                }],
                pr: [{
                    pr: w()
                }],
                pb: [{
                    pb: w()
                }],
                pl: [{
                    pl: w()
                }],
                m: [{
                    m: O()
                }],
                mx: [{
                    mx: O()
                }],
                my: [{
                    my: O()
                }],
                ms: [{
                    ms: O()
                }],
                me: [{
                    me: O()
                }],
                mbs: [{
                    mbs: O()
                }],
                mbe: [{
                    mbe: O()
                }],
                mt: [{
                    mt: O()
                }],
                mr: [{
                    mr: O()
                }],
                mb: [{
                    mb: O()
                }],
                ml: [{
                    ml: O()
                }],
                "space-x": [{
                    "space-x": w()
                }],
                "space-x-reverse": [`space-x-reverse`],
                "space-y": [{
                    "space-y": w()
                }],
                "space-y-reverse": [`space-y-reverse`],
                size: [{
                    size: ie()
                }],
                "inline-size": [{
                    inline: [`auto`, ...k()]
                }],
                "min-inline-size": [{
                    "min-inline": [`auto`, ...k()]
                }],
                "max-inline-size": [{
                    "max-inline": [`none`, ...k()]
                }],
                "block-size": [{
                    block: [`auto`, ...ae()]
                }],
                "min-block-size": [{
                    "min-block": [`auto`, ...ae()]
                }],
                "max-block-size": [{
                    "max-block": [`none`, ...ae()]
                }],
                w: [{
                    w: [s, `screen`, ...ie()]
                }],
                "min-w": [{
                    "min-w": [s, `screen`, `none`, ...ie()]
                }],
                "max-w": [{
                    "max-w": [s, `screen`, `none`, `prose`, {
                        screen: [o]
                    }, ...ie()]
                }],
                h: [{
                    h: [`screen`, `lh`, ...ie()]
                }],
                "min-h": [{
                    "min-h": [`screen`, `lh`, `none`, ...ie()]
                }],
                "max-h": [{
                    "max-h": [`screen`, `lh`, ...ie()]
                }],
                "font-size": [{
                    text: [`base`, n, Xo, Uo]
                }],
                "font-smoothing": [`antialiased`, `subpixel-antialiased`],
                "font-style": [`italic`, `not-italic`],
                "font-weight": [{
                    font: [r, ns, Go]
                }],
                "font-stretch": [{
                    "font-stretch": [`ultra-condensed`, `extra-condensed`, `condensed`, `semi-condensed`, `normal`, `semi-expanded`, `expanded`, `extra-expanded`, `ultra-expanded`, No, X]
                }],
                "font-family": [{
                    font: [Zo, Ko, t]
                }],
                "font-features": [{
                    "font-features": [X]
                }],
                "fvn-normal": [`normal-nums`],
                "fvn-ordinal": [`ordinal`],
                "fvn-slashed-zero": [`slashed-zero`],
                "fvn-figure": [`lining-nums`, `oldstyle-nums`],
                "fvn-spacing": [`proportional-nums`, `tabular-nums`],
                "fvn-fraction": [`diagonal-fractions`, `stacked-fractions`],
                tracking: [{
                    tracking: [i, Z, X]
                }],
                "line-clamp": [{
                    "line-clamp": [J, `none`, Z, Wo]
                }],
                leading: [{
                    leading: [a, ...w()]
                }],
                "list-image": [{
                    "list-image": [`none`, Z, X]
                }],
                "list-style-position": [{
                    list: [`inside`, `outside`]
                }],
                "list-style-type": [{
                    list: [`disc`, `decimal`, `none`, Z, X]
                }],
                "text-alignment": [{
                    text: [`left`, `center`, `right`, `justify`, `start`, `end`]
                }],
                "placeholder-color": [{
                    placeholder: A()
                }],
                "text-color": [{
                    text: A()
                }],
                "text-decoration": [`underline`, `overline`, `line-through`, `no-underline`],
                "text-decoration-style": [{
                    decoration: [...le(), `wavy`]
                }],
                "text-decoration-thickness": [{
                    decoration: [J, `from-font`, `auto`, Z, Uo]
                }],
                "text-decoration-color": [{
                    decoration: A()
                }],
                "underline-offset": [{
                    "underline-offset": [J, `auto`, Z, X]
                }],
                "text-transform": [`uppercase`, `lowercase`, `capitalize`, `normal-case`],
                "text-overflow": [`truncate`, `text-ellipsis`, `text-clip`],
                "text-wrap": [{
                    text: [`wrap`, `nowrap`, `balance`, `pretty`]
                }],
                indent: [{
                    indent: w()
                }],
                "tab-size": [{
                    tab: [Y, Z, X]
                }],
                "vertical-align": [{
                    align: [`baseline`, `top`, `middle`, `bottom`, `text-top`, `text-bottom`, `sub`, `super`, Z, X]
                }],
                whitespace: [{
                    whitespace: [`normal`, `nowrap`, `pre`, `pre-line`, `pre-wrap`, `break-spaces`]
                }],
                break: [{
                    break: [`normal`, `words`, `all`, `keep`]
                }],
                wrap: [{
                    wrap: [`break-word`, `anywhere`, `normal`]
                }],
                hyphens: [{
                    hyphens: [`none`, `manual`, `auto`]
                }],
                content: [{
                    content: [`none`, Z, X]
                }],
                "bg-attachment": [{
                    bg: [`fixed`, `local`, `scroll`]
                }],
                "bg-clip": [{
                    "bg-clip": [`border`, `padding`, `content`, `text`]
                }],
                "bg-origin": [{
                    "bg-origin": [`border`, `padding`, `content`]
                }],
                "bg-position": [{
                    bg: j()
                }],
                "bg-repeat": [{
                    bg: oe()
                }],
                "bg-size": [{
                    bg: se()
                }],
                "bg-image": [{
                    bg: [`none`, {
                        linear: [{
                            to: [`t`, `tr`, `r`, `br`, `b`, `bl`, `l`, `tl`]
                        }, Y, Z, X],
                        radial: [``, Z, X],
                        conic: [Y, Z, X]
                    }, es, Jo]
                }],
                "bg-color": [{
                    bg: A()
                }],
                "gradient-from-pos": [{
                    from: ce()
                }],
                "gradient-via-pos": [{
                    via: ce()
                }],
                "gradient-to-pos": [{
                    to: ce()
                }],
                "gradient-from": [{
                    from: A()
                }],
                "gradient-via": [{
                    via: A()
                }],
                "gradient-to": [{
                    to: A()
                }],
                rounded: [{
                    rounded: M()
                }],
                "rounded-s": [{
                    "rounded-s": M()
                }],
                "rounded-e": [{
                    "rounded-e": M()
                }],
                "rounded-t": [{
                    "rounded-t": M()
                }],
                "rounded-r": [{
                    "rounded-r": M()
                }],
                "rounded-b": [{
                    "rounded-b": M()
                }],
                "rounded-l": [{
                    "rounded-l": M()
                }],
                "rounded-ss": [{
                    "rounded-ss": M()
                }],
                "rounded-se": [{
                    "rounded-se": M()
                }],
                "rounded-ee": [{
                    "rounded-ee": M()
                }],
                "rounded-es": [{
                    "rounded-es": M()
                }],
                "rounded-tl": [{
                    "rounded-tl": M()
                }],
                "rounded-tr": [{
                    "rounded-tr": M()
                }],
                "rounded-br": [{
                    "rounded-br": M()
                }],
                "rounded-bl": [{
                    "rounded-bl": M()
                }],
                "border-w": [{
                    border: N()
                }],
                "border-w-x": [{
                    "border-x": N()
                }],
                "border-w-y": [{
                    "border-y": N()
                }],
                "border-w-s": [{
                    "border-s": N()
                }],
                "border-w-e": [{
                    "border-e": N()
                }],
                "border-w-bs": [{
                    "border-bs": N()
                }],
                "border-w-be": [{
                    "border-be": N()
                }],
                "border-w-t": [{
                    "border-t": N()
                }],
                "border-w-r": [{
                    "border-r": N()
                }],
                "border-w-b": [{
                    "border-b": N()
                }],
                "border-w-l": [{
                    "border-l": N()
                }],
                "divide-x": [{
                    "divide-x": N()
                }],
                "divide-x-reverse": [`divide-x-reverse`],
                "divide-y": [{
                    "divide-y": N()
                }],
                "divide-y-reverse": [`divide-y-reverse`],
                "border-style": [{
                    border: [...le(), `hidden`, `none`]
                }],
                "divide-style": [{
                    divide: [...le(), `hidden`, `none`]
                }],
                "border-color": [{
                    border: A()
                }],
                "border-color-x": [{
                    "border-x": A()
                }],
                "border-color-y": [{
                    "border-y": A()
                }],
                "border-color-s": [{
                    "border-s": A()
                }],
                "border-color-e": [{
                    "border-e": A()
                }],
                "border-color-bs": [{
                    "border-bs": A()
                }],
                "border-color-be": [{
                    "border-be": A()
                }],
                "border-color-t": [{
                    "border-t": A()
                }],
                "border-color-r": [{
                    "border-r": A()
                }],
                "border-color-b": [{
                    "border-b": A()
                }],
                "border-color-l": [{
                    "border-l": A()
                }],
                "divide-color": [{
                    divide: A()
                }],
                "outline-style": [{
                    outline: [...le(), `none`, `hidden`]
                }],
                "outline-offset": [{
                    "outline-offset": [J, Z, X]
                }],
                "outline-w": [{
                    outline: [``, J, Xo, Uo]
                }],
                "outline-color": [{
                    outline: A()
                }],
                shadow: [{
                    shadow: [``, `none`, u, ts, Yo]
                }],
                "shadow-color": [{
                    shadow: A()
                }],
                "inset-shadow": [{
                    "inset-shadow": [`none`, d, ts, Yo]
                }],
                "inset-shadow-color": [{
                    "inset-shadow": A()
                }],
                "ring-w": [{
                    ring: N()
                }],
                "ring-w-inset": [`ring-inset`],
                "ring-color": [{
                    ring: A()
                }],
                "ring-offset-w": [{
                    "ring-offset": [J, Uo]
                }],
                "ring-offset-color": [{
                    "ring-offset": A()
                }],
                "inset-ring-w": [{
                    "inset-ring": N()
                }],
                "inset-ring-color": [{
                    "inset-ring": A()
                }],
                "text-shadow": [{
                    "text-shadow": [`none`, f, ts, Yo]
                }],
                "text-shadow-color": [{
                    "text-shadow": A()
                }],
                opacity: [{
                    opacity: [J, Z, X]
                }],
                "mix-blend": [{
                    "mix-blend": [...ue(), `plus-darker`, `plus-lighter`]
                }],
                "bg-blend": [{
                    "bg-blend": ue()
                }],
                "mask-clip": [{
                    "mask-clip": [`border`, `padding`, `content`, `fill`, `stroke`, `view`]
                }, `mask-no-clip`],
                "mask-composite": [{
                    mask: [`add`, `subtract`, `intersect`, `exclude`]
                }],
                "mask-image-linear-pos": [{
                    "mask-linear": [J]
                }],
                "mask-image-linear-from-pos": [{
                    "mask-linear-from": P()
                }],
                "mask-image-linear-to-pos": [{
                    "mask-linear-to": P()
                }],
                "mask-image-linear-from-color": [{
                    "mask-linear-from": A()
                }],
                "mask-image-linear-to-color": [{
                    "mask-linear-to": A()
                }],
                "mask-image-t-from-pos": [{
                    "mask-t-from": P()
                }],
                "mask-image-t-to-pos": [{
                    "mask-t-to": P()
                }],
                "mask-image-t-from-color": [{
                    "mask-t-from": A()
                }],
                "mask-image-t-to-color": [{
                    "mask-t-to": A()
                }],
                "mask-image-r-from-pos": [{
                    "mask-r-from": P()
                }],
                "mask-image-r-to-pos": [{
                    "mask-r-to": P()
                }],
                "mask-image-r-from-color": [{
                    "mask-r-from": A()
                }],
                "mask-image-r-to-color": [{
                    "mask-r-to": A()
                }],
                "mask-image-b-from-pos": [{
                    "mask-b-from": P()
                }],
                "mask-image-b-to-pos": [{
                    "mask-b-to": P()
                }],
                "mask-image-b-from-color": [{
                    "mask-b-from": A()
                }],
                "mask-image-b-to-color": [{
                    "mask-b-to": A()
                }],
                "mask-image-l-from-pos": [{
                    "mask-l-from": P()
                }],
                "mask-image-l-to-pos": [{
                    "mask-l-to": P()
                }],
                "mask-image-l-from-color": [{
                    "mask-l-from": A()
                }],
                "mask-image-l-to-color": [{
                    "mask-l-to": A()
                }],
                "mask-image-x-from-pos": [{
                    "mask-x-from": P()
                }],
                "mask-image-x-to-pos": [{
                    "mask-x-to": P()
                }],
                "mask-image-x-from-color": [{
                    "mask-x-from": A()
                }],
                "mask-image-x-to-color": [{
                    "mask-x-to": A()
                }],
                "mask-image-y-from-pos": [{
                    "mask-y-from": P()
                }],
                "mask-image-y-to-pos": [{
                    "mask-y-to": P()
                }],
                "mask-image-y-from-color": [{
                    "mask-y-from": A()
                }],
                "mask-image-y-to-color": [{
                    "mask-y-to": A()
                }],
                "mask-image-radial": [{
                    "mask-radial": [Z, X]
                }],
                "mask-image-radial-from-pos": [{
                    "mask-radial-from": P()
                }],
                "mask-image-radial-to-pos": [{
                    "mask-radial-to": P()
                }],
                "mask-image-radial-from-color": [{
                    "mask-radial-from": A()
                }],
                "mask-image-radial-to-color": [{
                    "mask-radial-to": A()
                }],
                "mask-image-radial-shape": [{
                    "mask-radial": [`circle`, `ellipse`]
                }],
                "mask-image-radial-size": [{
                    "mask-radial": [{
                        closest: [`side`, `corner`],
                        farthest: [`side`, `corner`]
                    }]
                }],
                "mask-image-radial-pos": [{
                    "mask-radial-at": b()
                }],
                "mask-image-conic-pos": [{
                    "mask-conic": [J]
                }],
                "mask-image-conic-from-pos": [{
                    "mask-conic-from": P()
                }],
                "mask-image-conic-to-pos": [{
                    "mask-conic-to": P()
                }],
                "mask-image-conic-from-color": [{
                    "mask-conic-from": A()
                }],
                "mask-image-conic-to-color": [{
                    "mask-conic-to": A()
                }],
                "mask-mode": [{
                    mask: [`alpha`, `luminance`, `match`]
                }],
                "mask-origin": [{
                    "mask-origin": [`border`, `padding`, `content`, `fill`, `stroke`, `view`]
                }],
                "mask-position": [{
                    mask: j()
                }],
                "mask-repeat": [{
                    mask: oe()
                }],
                "mask-size": [{
                    mask: se()
                }],
                "mask-type": [{
                    "mask-type": [`alpha`, `luminance`]
                }],
                "mask-image": [{
                    mask: [`none`, Z, X]
                }],
                filter: [{
                    filter: [``, `none`, Z, X]
                }],
                blur: [{
                    blur: de()
                }],
                brightness: [{
                    brightness: [J, Z, X]
                }],
                contrast: [{
                    contrast: [J, Z, X]
                }],
                "drop-shadow": [{
                    "drop-shadow": [``, `none`, p, ts, Yo]
                }],
                "drop-shadow-color": [{
                    "drop-shadow": A()
                }],
                grayscale: [{
                    grayscale: [``, J, Z, X]
                }],
                "hue-rotate": [{
                    "hue-rotate": [J, Z, X]
                }],
                invert: [{
                    invert: [``, J, Z, X]
                }],
                saturate: [{
                    saturate: [J, Z, X]
                }],
                sepia: [{
                    sepia: [``, J, Z, X]
                }],
                "backdrop-filter": [{
                    "backdrop-filter": [``, `none`, Z, X]
                }],
                "backdrop-blur": [{
                    "backdrop-blur": de()
                }],
                "backdrop-brightness": [{
                    "backdrop-brightness": [J, Z, X]
                }],
                "backdrop-contrast": [{
                    "backdrop-contrast": [J, Z, X]
                }],
                "backdrop-grayscale": [{
                    "backdrop-grayscale": [``, J, Z, X]
                }],
                "backdrop-hue-rotate": [{
                    "backdrop-hue-rotate": [J, Z, X]
                }],
                "backdrop-invert": [{
                    "backdrop-invert": [``, J, Z, X]
                }],
                "backdrop-opacity": [{
                    "backdrop-opacity": [J, Z, X]
                }],
                "backdrop-saturate": [{
                    "backdrop-saturate": [J, Z, X]
                }],
                "backdrop-sepia": [{
                    "backdrop-sepia": [``, J, Z, X]
                }],
                "border-collapse": [{
                    border: [`collapse`, `separate`]
                }],
                "border-spacing": [{
                    "border-spacing": w()
                }],
                "border-spacing-x": [{
                    "border-spacing-x": w()
                }],
                "border-spacing-y": [{
                    "border-spacing-y": w()
                }],
                "table-layout": [{
                    table: [`auto`, `fixed`]
                }],
                caption: [{
                    caption: [`top`, `bottom`]
                }],
                transition: [{
                    transition: [``, `all`, `colors`, `opacity`, `shadow`, `transform`, `none`, Z, X]
                }],
                "transition-behavior": [{
                    transition: [`normal`, `discrete`]
                }],
                duration: [{
                    duration: [J, `initial`, Z, X]
                }],
                ease: [{
                    ease: [`linear`, `initial`, _, Z, X]
                }],
                delay: [{
                    delay: [J, Z, X]
                }],
                animate: [{
                    animate: [`none`, v, Z, X]
                }],
                backface: [{
                    backface: [`hidden`, `visible`]
                }],
                perspective: [{
                    perspective: [h, Z, X]
                }],
                "perspective-origin": [{
                    "perspective-origin": x()
                }],
                rotate: [{
                    rotate: F()
                }],
                "rotate-x": [{
                    "rotate-x": F()
                }],
                "rotate-y": [{
                    "rotate-y": F()
                }],
                "rotate-z": [{
                    "rotate-z": F()
                }],
                scale: [{
                    scale: fe()
                }],
                "scale-x": [{
                    "scale-x": fe()
                }],
                "scale-y": [{
                    "scale-y": fe()
                }],
                "scale-z": [{
                    "scale-z": fe()
                }],
                "scale-3d": [`scale-3d`],
                skew: [{
                    skew: pe()
                }],
                "skew-x": [{
                    "skew-x": pe()
                }],
                "skew-y": [{
                    "skew-y": pe()
                }],
                transform: [{
                    transform: [Z, X, ``, `none`, `gpu`, `cpu`]
                }],
                "transform-origin": [{
                    origin: x()
                }],
                "transform-style": [{
                    transform: [`3d`, `flat`]
                }],
                translate: [{
                    translate: me()
                }],
                "translate-x": [{
                    "translate-x": me()
                }],
                "translate-y": [{
                    "translate-y": me()
                }],
                "translate-z": [{
                    "translate-z": me()
                }],
                "translate-none": [`translate-none`],
                zoom: [{
                    zoom: [Y, Z, X]
                }],
                accent: [{
                    accent: A()
                }],
                appearance: [{
                    appearance: [`none`, `auto`]
                }],
                "caret-color": [{
                    caret: A()
                }],
                "color-scheme": [{
                    scheme: [`normal`, `dark`, `light`, `light-dark`, `only-dark`, `only-light`]
                }],
                cursor: [{
                    cursor: [`auto`, `default`, `pointer`, `wait`, `text`, `move`, `help`, `not-allowed`, `none`, `context-menu`, `progress`, `cell`, `crosshair`, `vertical-text`, `alias`, `copy`, `no-drop`, `grab`, `grabbing`, `all-scroll`, `col-resize`, `row-resize`, `n-resize`, `e-resize`, `s-resize`, `w-resize`, `ne-resize`, `nw-resize`, `se-resize`, `sw-resize`, `ew-resize`, `ns-resize`, `nesw-resize`, `nwse-resize`, `zoom-in`, `zoom-out`, Z, X]
                }],
                "field-sizing": [{
                    "field-sizing": [`fixed`, `content`]
                }],
                "pointer-events": [{
                    "pointer-events": [`auto`, `none`]
                }],
                resize: [{
                    resize: [`none`, ``, `y`, `x`]
                }],
                "scroll-behavior": [{
                    scroll: [`auto`, `smooth`]
                }],
                "scrollbar-thumb-color": [{
                    "scrollbar-thumb": A()
                }],
                "scrollbar-track-color": [{
                    "scrollbar-track": A()
                }],
                "scrollbar-gutter": [{
                    "scrollbar-gutter": [`auto`, `stable`, `both`]
                }],
                "scrollbar-w": [{
                    scrollbar: [`auto`, `thin`, `none`]
                }],
                "scroll-m": [{
                    "scroll-m": w()
                }],
                "scroll-mx": [{
                    "scroll-mx": w()
                }],
                "scroll-my": [{
                    "scroll-my": w()
                }],
                "scroll-ms": [{
                    "scroll-ms": w()
                }],
                "scroll-me": [{
                    "scroll-me": w()
                }],
                "scroll-mbs": [{
                    "scroll-mbs": w()
                }],
                "scroll-mbe": [{
                    "scroll-mbe": w()
                }],
                "scroll-mt": [{
                    "scroll-mt": w()
                }],
                "scroll-mr": [{
                    "scroll-mr": w()
                }],
                "scroll-mb": [{
                    "scroll-mb": w()
                }],
                "scroll-ml": [{
                    "scroll-ml": w()
                }],
                "scroll-p": [{
                    "scroll-p": w()
                }],
                "scroll-px": [{
                    "scroll-px": w()
                }],
                "scroll-py": [{
                    "scroll-py": w()
                }],
                "scroll-ps": [{
                    "scroll-ps": w()
                }],
                "scroll-pe": [{
                    "scroll-pe": w()
                }],
                "scroll-pbs": [{
                    "scroll-pbs": w()
                }],
                "scroll-pbe": [{
                    "scroll-pbe": w()
                }],
                "scroll-pt": [{
                    "scroll-pt": w()
                }],
                "scroll-pr": [{
                    "scroll-pr": w()
                }],
                "scroll-pb": [{
                    "scroll-pb": w()
                }],
                "scroll-pl": [{
                    "scroll-pl": w()
                }],
                "snap-align": [{
                    snap: [`start`, `end`, `center`, `align-none`]
                }],
                "snap-stop": [{
                    snap: [`normal`, `always`]
                }],
                "snap-type": [{
                    snap: [`none`, `x`, `y`, `both`]
                }],
                "snap-strictness": [{
                    snap: [`mandatory`, `proximity`]
                }],
                touch: [{
                    touch: [`auto`, `none`, `manipulation`]
                }],
                "touch-x": [{
                    "touch-pan": [`x`, `left`, `right`]
                }],
                "touch-y": [{
                    "touch-pan": [`y`, `up`, `down`]
                }],
                "touch-pz": [`touch-pinch-zoom`],
                select: [{
                    select: [`none`, `text`, `all`, `auto`]
                }],
                "will-change": [{
                    "will-change": [`auto`, `scroll`, `contents`, `transform`, Z, X]
                }],
                fill: [{
                    fill: [`none`, ...A()]
                }],
                "stroke-w": [{
                    stroke: [J, Xo, Uo, Wo]
                }],
                stroke: [{
                    stroke: [`none`, ...A()]
                }],
                "forced-color-adjust": [{
                    "forced-color-adjust": [`auto`, `none`]
                }]
            },
            conflictingClassGroups: {
                "container-named": [`container-type`],
                overflow: [`overflow-x`, `overflow-y`],
                overscroll: [`overscroll-x`, `overscroll-y`],
                inset: [`inset-x`, `inset-y`, `inset-bs`, `inset-be`, `start`, `end`, `top`, `right`, `bottom`, `left`],
                "inset-x": [`right`, `left`],
                "inset-y": [`top`, `bottom`],
                flex: [`basis`, `grow`, `shrink`],
                gap: [`gap-x`, `gap-y`],
                p: [`px`, `py`, `ps`, `pe`, `pbs`, `pbe`, `pt`, `pr`, `pb`, `pl`],
                px: [`pr`, `pl`],
                py: [`pt`, `pb`],
                m: [`mx`, `my`, `ms`, `me`, `mbs`, `mbe`, `mt`, `mr`, `mb`, `ml`],
                mx: [`mr`, `ml`],
                my: [`mt`, `mb`],
                size: [`w`, `h`],
                "font-size": [`leading`],
                "fvn-normal": [`fvn-ordinal`, `fvn-slashed-zero`, `fvn-figure`, `fvn-spacing`, `fvn-fraction`],
                "fvn-ordinal": [`fvn-normal`],
                "fvn-slashed-zero": [`fvn-normal`],
                "fvn-figure": [`fvn-normal`],
                "fvn-spacing": [`fvn-normal`],
                "fvn-fraction": [`fvn-normal`],
                "line-clamp": [`display`, `overflow`],
                rounded: [`rounded-s`, `rounded-e`, `rounded-t`, `rounded-r`, `rounded-b`, `rounded-l`, `rounded-ss`, `rounded-se`, `rounded-ee`, `rounded-es`, `rounded-tl`, `rounded-tr`, `rounded-br`, `rounded-bl`],
                "rounded-s": [`rounded-ss`, `rounded-es`],
                "rounded-e": [`rounded-se`, `rounded-ee`],
                "rounded-t": [`rounded-tl`, `rounded-tr`],
                "rounded-r": [`rounded-tr`, `rounded-br`],
                "rounded-b": [`rounded-br`, `rounded-bl`],
                "rounded-l": [`rounded-tl`, `rounded-bl`],
                "border-spacing": [`border-spacing-x`, `border-spacing-y`],
                "border-w": [`border-w-x`, `border-w-y`, `border-w-s`, `border-w-e`, `border-w-bs`, `border-w-be`, `border-w-t`, `border-w-r`, `border-w-b`, `border-w-l`],
                "border-w-x": [`border-w-r`, `border-w-l`],
                "border-w-y": [`border-w-t`, `border-w-b`],
                "border-color": [`border-color-x`, `border-color-y`, `border-color-s`, `border-color-e`, `border-color-bs`, `border-color-be`, `border-color-t`, `border-color-r`, `border-color-b`, `border-color-l`],
                "border-color-x": [`border-color-r`, `border-color-l`],
                "border-color-y": [`border-color-t`, `border-color-b`],
                translate: [`translate-x`, `translate-y`, `translate-none`],
                "translate-none": [`translate`, `translate-x`, `translate-y`, `translate-z`],
                "scroll-m": [`scroll-mx`, `scroll-my`, `scroll-ms`, `scroll-me`, `scroll-mbs`, `scroll-mbe`, `scroll-mt`, `scroll-mr`, `scroll-mb`, `scroll-ml`],
                "scroll-mx": [`scroll-mr`, `scroll-ml`],
                "scroll-my": [`scroll-mt`, `scroll-mb`],
                "scroll-p": [`scroll-px`, `scroll-py`, `scroll-ps`, `scroll-pe`, `scroll-pbs`, `scroll-pbe`, `scroll-pt`, `scroll-pr`, `scroll-pb`, `scroll-pl`],
                "scroll-px": [`scroll-pr`, `scroll-pl`],
                "scroll-py": [`scroll-pt`, `scroll-pb`],
                touch: [`touch-x`, `touch-y`, `touch-pz`],
                "touch-x": [`touch`],
                "touch-y": [`touch`],
                "touch-pz": [`touch`]
            },
            conflictingClassGroupModifiers: {
                "font-size": [`leading`]
            },
            postfixLookupClassGroups: [`container-type`],
            orderSensitiveModifiers: [`*`, `**`, `after`, `backdrop`, `before`, `details-content`, `file`, `first-letter`, `first-line`, `marker`, `placeholder`, `selection`]
        }
    });

function ms(...e) {
    return ps(o(e))
}

function hs({
    className: e,
    orientation: t = `horizontal`,
    ...n
}) {
    return (0, D.jsx)(Va, {
        "data-slot": `tabs`,
        "data-orientation": t,
        orientation: t,
        className: ms(`group/tabs flex gap-2 data-[orientation=horizontal]:flex-col`, e),
        ...n
    })
}
var gs = l(`group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none`, {
    variants: {
        variant: {
            default: `bg-muted`,
            line: `gap-1 bg-transparent`
        }
    },
    defaultVariants: {
        variant: `default`
    }
});

function _s({
    className: e,
    variant: t = `default`,
    ...n
}) {
    return (0, D.jsx)(Ha, {
        "data-slot": `tabs-list`,
        "data-variant": t,
        className: ms(gs({
            variant: t
        }), e),
        ...n
    })
}

function vs({
    className: e,
    ...t
}) {
    return (0, D.jsx)(Ua, {
        "data-slot": `tabs-trigger`,
        className: ms(`relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`, `group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent`, `data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground`, `after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100`, e),
        ...t
    })
}

function ys({
    className: e,
    value: t,
    ...n
}) {
    return (0, D.jsx)(wa, {
        "data-slot": `progress`,
        value: t,
        className: ms(`relative h-2 w-full overflow-hidden rounded-full bg-primary/20`, e),
        ...n,
        children: (0, D.jsx)(Ta, {
            "data-slot": `progress-indicator`,
            className: `h-full w-full flex-1 bg-primary transition-all`,
            style: {
                transform: `translateX(-${100-(t??0)}%)`
            }
        })
    })
}
var bs = (...e) => e.filter((e, t, n) => !!e && e.trim() !== `` && n.indexOf(e) === t).join(` `).trim(),
    xs = e => e.replace(/([a-z0-9])([A-Z])/g, `$1-$2`).toLowerCase(),
    Ss = e => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()),
    Cs = e => {
        let t = Ss(e);
        return t.charAt(0).toUpperCase() + t.slice(1)
    },
    ws = {
        xmlns: `http://www.w3.org/2000/svg`,
        width: 24,
        height: 24,
        viewBox: `0 0 24 24`,
        fill: `none`,
        stroke: `currentColor`,
        strokeWidth: 2,
        strokeLinecap: `round`,
        strokeLinejoin: `round`
    },
    Ts = e => {
        for (let t in e)
            if (t.startsWith(`aria-`) || t === `role` || t === `title`) return !0;
        return !1
    },
    Es = (0, i.createContext)({}),
    Ds = () => (0, i.useContext)(Es),
    Os = (0, i.forwardRef)(({
        color: e,
        size: t,
        strokeWidth: n,
        absoluteStrokeWidth: r,
        className: a = ``,
        children: o,
        iconNode: s,
        ...c
    }, l) => {
        let {
            size: u = 24,
            strokeWidth: d = 2,
            absoluteStrokeWidth: f = !1,
            color: p = `currentColor`,
            className: m = ``
        } = Ds() ?? {}, h = r ?? f ? Number(n ?? d) * 24 / Number(t ?? u) : n ?? d;
        return (0, i.createElement)(`svg`, {
            ref: l,
            ...ws,
            width: t ?? u ?? ws.width,
            height: t ?? u ?? ws.height,
            stroke: e ?? p,
            strokeWidth: h,
            className: bs(`lucide`, m, a),
            ...!o && !Ts(c) && {
                "aria-hidden": `true`
            },
            ...c
        }, [...s.map(([e, t]) => (0, i.createElement)(e, t)), ...Array.isArray(o) ? o : [o]])
    }),
    ks = (e, t) => {
        let n = (0, i.forwardRef)(({
            className: n,
            ...r
        }, a) => (0, i.createElement)(Os, {
            ref: a,
            iconNode: t,
            className: bs(`lucide-${xs(Cs(e))}`, `lucide-${e}`, n),
            ...r
        }));
        return n.displayName = Cs(e), n
    },
    As = ks(`arrow-left`, [
        [`path`, {
            d: `m12 19-7-7 7-7`,
            key: `1l729n`
        }],
        [`path`, {
            d: `M19 12H5`,
            key: `x3x0zl`
        }]
    ]),
    js = ks(`arrow-right`, [
        [`path`, {
            d: `M5 12h14`,
            key: `1ays0h`
        }],
        [`path`, {
            d: `m12 5 7 7-7 7`,
            key: `xquz4c`
        }]
    ]),
    Ms = ks(`check`, [
        [`path`, {
            d: `M20 6 9 17l-5-5`,
            key: `1gmf2c`
        }]
    ]),
    Ns = ks(`chevron-right`, [
        [`path`, {
            d: `m9 18 6-6-6-6`,
            key: `mthhwq`
        }]
    ]),
    Ps = ks(`layers`, [
        [`path`, {
            d: `M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z`,
            key: `zw3jo`
        }],
        [`path`, {
            d: `M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12`,
            key: `1wduqc`
        }],
        [`path`, {
            d: `M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17`,
            key: `kqbvx6`
        }]
    ]),
    Fs = ks(`maximize-2`, [
        [`path`, {
            d: `M15 3h6v6`,
            key: `1q9fwt`
        }],
        [`path`, {
            d: `m21 3-7 7`,
            key: `1l2asr`
        }],
        [`path`, {
            d: `m3 21 7-7`,
            key: `tjx5ai`
        }],
        [`path`, {
            d: `M9 21H3v-6`,
            key: `wtvkvv`
        }]
    ]),
    Is = ks(`notebook-pen`, [
        [`path`, {
            d: `M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4`,
            key: `re6nr2`
        }],
        [`path`, {
            d: `M2 6h4`,
            key: `aawbzj`
        }],
        [`path`, {
            d: `M2 10h4`,
            key: `l0bgd4`
        }],
        [`path`, {
            d: `M2 14h4`,
            key: `1gsvsf`
        }],
        [`path`, {
            d: `M2 18h4`,
            key: `1bu2t1`
        }],
        [`path`, {
            d: `M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z`,
            key: `pqwjuv`
        }]
    ]),
    Ls = ks(`x`, [
        [`path`, {
            d: `M18 6 6 18`,
            key: `1bl5f8`
        }],
        [`path`, {
            d: `m6 6 12 12`,
            key: `d8bk6v`
        }]
    ]),
    Rs = {
        journey: [{
            id: `journey:1`,
            label: `Enquiry`,
            when: `Tuesday, 9:42am`,
            quote: `Found them, answered six questions, went back to my coffee.`,
            never: `fill in a sixteen-field form, or ring during business hours to get a price.`,
            department: `marketing`,
            contribution: `Source + enquiry`
        }, {
            id: `journey:2`,
            label: `Contact`,
            when: `Tuesday, 10:15am`,
            quote: `They rang back inside half an hour, and they already knew what I'd asked for.`,
            never: `explain it all again from the start.`,
            department: `sales`,
            contribution: `Requirements`
        }, {
            id: `journey:3`,
            label: `Booking`,
            when: `Tuesday, 10:22am`,
            quote: `I picked Thursday 2pm myself, straight off their calendar.`,
            never: `play phone tag for three days about a time.`,
            department: `sales`,
            contribution: `Appointment`
        }, {
            id: `journey:4`,
            label: `Site visit`,
            when: `Thursday, 2:00pm`,
            quote: `He turned up when he said he would. Measured, took photos, explained the gutter problem.`,
            never: `chase, or sit home all afternoon wondering.`,
            department: `sales`,
            contribution: `Measurements + photos`
        }, {
            id: `journey:5`,
            label: `Quote`,
            when: `Friday, 4:30pm`,
            quote: `The quote came Friday. It was properly priced, not a number off the top of his head.`,
            never: `wait a fortnight and ring twice to get it.`,
            department: `sales`,
            contribution: `Priced scope`
        }, {
            id: `journey:6`,
            label: `Signature`,
            when: `Sunday, 8:14pm`,
            quote: `I signed it on the couch, on my phone.`,
            never: `print it, sign it, photograph it and email back a crooked JPEG.`,
            department: `sales`,
            contribution: `Signed quote`
        }, {
            id: `journey:7`,
            label: `Installation`,
            when: `Week one`,
            quote: `Someone rang before the crew turned up. I knew what was happening and when.`,
            never: `ring and ask where things were up to.`,
            department: `operations`,
            contribution: `Schedule`
        }, {
            id: `journey:8`,
            label: `Variation`,
            when: `Week three`,
            quote: `There was a variation for the gutter. They priced it there and then, I approved it on my phone.`,
            never: `have an awkward argument about it at the end.`,
            department: `field`,
            contribution: `Approved variation`
        }, {
            id: `journey:9`,
            label: `Invoice`,
            when: `Week five`,
            quote: `The invoice matched the job. Including the variation.`,
            never: `check it line by line against the quote.`,
            department: `finance`,
            contribution: `Invoice + payment`
        }, {
            id: `journey:10`,
            label: `Service`,
            when: `Week nine`,
            quote: `A panel started squeaking. I told them, and they knew exactly which panel it was.`,
            never: `explain my own job back to the people who built it.`,
            department: `service`,
            contribution: `Service history`
        }, {
            id: `journey:11`,
            label: `Referral`,
            when: `Week twelve`,
            quote: `I told two neighbours. Both of them rang.`,
            never: `be asked. Which is the only kind of referral worth having.`,
            department: `marketing`,
            contribution: `Referral source`
        }],
        leadershipQuestions: [{
            question: `What does a customer cost us to win, by channel?`,
            source: `Marketing → Sales`
        }, {
            question: `Which estimator converts, and who's quoting too high?`,
            source: `Sales`
        }, {
            question: `How long from enquiry to installed, really?`,
            source: `Sales → Operations → Field`
        }, {
            question: `What's our margin by product line, with variations in it?`,
            source: `Sales → Field → Finance`
        }, {
            question: `Are the crews busy, or are we carrying capacity?`,
            source: `People → Projects`
        }, {
            question: `Who owes us money, and for how long?`,
            source: `Finance`
        }, {
            question: `Which suburbs convert, and which waste three site visits?`,
            source: `Sales → Field`
        }, {
            question: `What do customers complain about, and what does it cost?`,
            source: `Service → Finance`
        }, {
            question: `Where is work sitting still right now?`,
            source: `Projects`
        }, {
            question: `Is our problem lead volume, or lead quality?`,
            source: `Marketing → Sales`
        }]
    },
    zs = [{
        id: `customer`,
        name: `Customer`,
        hint: `The experience`
    }, {
        id: `people`,
        name: `People`,
        hint: `The humans behind it`
    }, {
        id: `process`,
        name: `Process`,
        hint: `How work moves`
    }, {
        id: `systems`,
        name: `Systems`,
        hint: `Where data lives`
    }, {
        id: `friction`,
        name: `Friction`,
        hint: `Where the thread breaks`
    }, {
        id: `future`,
        name: `Future`,
        hint: `What could improve`
    }],
    Q = {
        id: `harbourline`,
        name: `Harbourline Outdoor Living`,
        location: `Western Sydney`,
        customer: {
            name: `Sarah`,
            location: `Castle Hill`,
            job: `Louvred roof over the deck`
        },
        departments: [{
            id: `marketing`,
            name: `Marketing`,
            x: 230,
            y: 110,
            short: `The first impression`,
            person: `Marketing team`,
            system: `Forms · Campaigns`,
            contribution: `Source + enquiry`
        }, {
            id: `sales`,
            name: `Sales / Estimating`,
            x: 520,
            y: 90,
            short: `The promise`,
            person: `Dave · Estimator`,
            system: `CRM · Calendar`,
            contribution: `Measurements + quote`
        }, {
            id: `operations`,
            name: `Operations`,
            x: 810,
            y: 110,
            short: `The plan`,
            person: `Priya · Coordinator`,
            system: `Projects · Files`,
            contribution: `Schedule + access notes`
        }, {
            id: `field`,
            name: `Field / Delivery`,
            x: 900,
            y: 290,
            short: `The work on site`,
            person: `Mick · Crew leader`,
            system: `Field tools · Messaging`,
            contribution: `Completion + variation`
        }, {
            id: `finance`,
            name: `Finance`,
            x: 810,
            y: 470,
            short: `The commercial truth`,
            person: `Ange · Accounts`,
            system: `Accounting`,
            contribution: `Invoice + payment`
        }, {
            id: `service`,
            name: `Service`,
            x: 520,
            y: 490,
            short: `The ongoing relationship`,
            person: `The Phone · Support`,
            system: `Phone · Service desk`,
            contribution: `Service history`
        }, {
            id: `people`,
            name: `People`,
            x: 230,
            y: 470,
            short: `The capacity`,
            person: `People team`,
            system: `Rosters · Training`,
            contribution: `Crew availability`
        }, {
            id: `leadership`,
            name: `Leadership`,
            x: 140,
            y: 290,
            short: `The bigger picture`,
            person: `Director`,
            system: `Reporting`,
            contribution: `Business visibility`
        }]
    },
    Bs = Rs.journey,
    Vs = Rs.leadershipQuestions,
    Hs = [{
        id: `person:dave`,
        department: `sales`,
        name: `Dave`,
        role: `Estimator`,
        beats: [{
            title: `Opens with`,
            body: `A prioritised list of who to ring and visit, sorted by district.`
        }, {
            title: `His day`,
            body: `Measurements, photos and a voice note captured on Sarah’s record, on site.`
        }, {
            title: `He stopped`,
            body: `Re-typing his notebook at 6pm. Losing photos in his camera roll. Guessing from an old price list.`
        }, {
            title: `Where it goes`,
            body: `Priya receives the scope. Mick has the photos before he arrives. Service keeps the history.`
        }, {
            title: `What it’s worth`,
            body: `Less driving, less admin and evenings back.`
        }]
    }, {
        id: `person:priya`,
        department: `operations`,
        name: `Priya`,
        role: `Operations coordinator`,
        beats: [{
            title: `Opens with`,
            body: `Every job signed overnight, already built as a project with materials, site photos and access notes.`
        }, {
            title: `Her day`,
            body: `Scheduling crews and solving problems, without reconstructing what was sold.`
        }, {
            title: `She stopped`,
            body: `Ringing Dave to ask what was quoted. Chasing photos. Rebuilding the same checklist.`
        }, {
            title: `Where it goes`,
            body: `Mick’s phone knows his day. Sarah receives her week-one call.`
        }, {
            title: `What it’s worth`,
            body: `The handover stops being a conversation someone has to remember.`
        }]
    }, {
        id: `person:mick`,
        department: `field`,
        name: `Mick`,
        role: `Crew leader`,
        beats: [{
            title: `Opens with`,
            body: `Today’s job on his phone: address, specifications, access notes, before-photos and checklist.`
        }, {
            title: `On site`,
            body: `Ticks off work, photographs the finish and gets sign-off. Raises and prices the gutter variation on site.`
        }, {
            title: `He stopped`,
            body: `Ringing the office for missing context. Doing variations on the nod that nobody bills.`
        }, {
            title: `Where it goes`,
            body: `Ange invoices what was delivered. Service inherits the full history.`
        }, {
            title: `What it’s worth`,
            body: `He looks organised in front of the customer. The crew has what it needs to do the work.`
        }]
    }, {
        id: `person:ange`,
        department: `finance`,
        name: `Ange`,
        role: `Finance / accounts`,
        beats: [{
            title: `Opens with`,
            body: `Progress claims built from what was delivered, including Mick’s approved gutter variation.`
        }, {
            title: `Her day`,
            body: `Checking, not typing. Oversight instead of data entry.`
        }, {
            title: `She stopped`,
            body: `Re-reading quotes to work out what to bill. Chasing payment from memory.`
        }, {
            title: `Where it goes`,
            body: `The director’s Monday margin view uses the work Ange has already recorded.`
        }, {
            title: `What it’s worth`,
            body: `More jobs handled without duplicating the bookkeeping effort.`
        }]
    }, {
        id: `person:phone`,
        department: `service`,
        name: `The Phone`,
        role: `Whoever answers`,
        beats: [{
            title: `Opens with`,
            body: `The caller’s name, job, history and open ticket, on screen before hello.`
        }, {
            title: `Their day`,
            body: `Answering, not apologising. “Is this about the louvred roof at Castle Hill?”`
        }, {
            title: `They stopped`,
            body: `“Bear with me, I’ll have to find out and call you back.”`
        }, {
            title: `Where it goes`,
            body: `The next person starts where the last one finished.`
        }, {
            title: `What it’s worth`,
            body: `Sarah feels remembered. Service earns the next referral.`
        }]
    }, {
        id: `person:director`,
        department: `leadership`,
        name: `Director`,
        role: `Leadership`,
        beats: [{
            title: `Opens with`,
            body: `Monday, 7:30am. One screen. Nobody prepared it.`
        }, {
            title: `Their day`,
            body: `Deciding where the next dollar and the next hire should go.`
        }, {
            title: `They stopped`,
            body: `Ringing around to understand status and assembling reports from conflicting spreadsheets.`
        }, {
            title: `Where it goes`,
            body: `Clear decisions about capacity, margin and customer experience.`
        }, {
            title: `What it’s worth`,
            body: `Visibility while there is still time to act.`
        }]
    }],
    Us = [{
        id: `handoff:marketing-sales`,
        from: `marketing`,
        to: `sales`,
        label: `Marketing → Sales`,
        point: {
            x: 375,
            y: 65
        },
        path: `M230 110 Q375 30 520 90`,
        manual: !1,
        what: `An enquiry becomes a lead with an owner.`,
        information: `Contact details, suburb, requirements and source.`,
        how: `A captured form creates a customer record.`,
        next: `Dave qualifies the enquiry and books a site visit.`,
        friction: {
            title: `Source lost in the inbox`,
            happening: `Enquiries arrive as emails without their campaign source.`,
            matters: `Marketing cannot see which spend becomes delivered work.`,
            costs: [`Visibility`, `Time`]
        },
        future: {
            action: `Connect`,
            title: `Keep the source with the customer`,
            steps: [`Capture the enquiry`, `Attach the campaign source`, `Assign by suburb`, `Notify the estimator`],
            result: `The first conversation begins with context.`
        }
    }, {
        id: `handoff:sales-operations`,
        from: `sales`,
        to: `operations`,
        label: `Sales → Operations`,
        point: {
            x: 665,
            y: 65
        },
        path: `M520 90 Q665 30 810 110`,
        manual: !0,
        what: `Sarah signs the quote. Dave hands the job to Priya.`,
        information: `Signed scope, measurements, photos, gutter notes, materials and access requirements.`,
        how: `Email, phone calls and someone remembering to pass it on.`,
        next: `Priya reconstructs the scope, creates the project and schedules a crew.`,
        friction: {
            title: `The signed job waits for a conversation`,
            happening: `Dave has the measurements and photos. Priya receives them manually and rebuilds what was sold.`,
            matters: `Photos can be missing, scheduling waits and Sarah may be asked to explain herself again.`,
            costs: [`Time`, `Customer patience`, `Risk`]
        },
        future: {
            action: `Automate`,
            title: `A signature becomes a ready-to-schedule job`,
            steps: [`Quote accepted`, `Project automatically created`, `Measurements + photos attached`, `Operations notified`, `Ready for scheduling`],
            result: `Priya schedules the work with the context Dave already captured.`
        }
    }, {
        id: `handoff:operations-field`,
        from: `operations`,
        to: `field`,
        label: `Operations → Field`,
        point: {
            x: 910,
            y: 190
        },
        path: `M810 110 Q920 150 900 290`,
        manual: !1,
        what: `Priya assigns a job to Mick’s crew.`,
        information: `Schedule, address, specifications, access notes and checklist.`,
        how: `A job pack and crew schedule.`,
        next: `Mick arrives with the right materials and site information.`,
        friction: {
            title: `The crew arrives without the context`,
            happening: `Access notes and site photos are scattered across messages.`,
            matters: `Mick has to ring the office before he can start.`,
            costs: [`Time`, `Customer patience`]
        },
        future: {
            action: `Standardise`,
            title: `One complete job pack`,
            steps: [`Confirm the scope`, `Attach the site information`, `Assign the crew`, `Deliver a clear checklist`],
            result: `The crew can start without chasing the office.`
        }
    }, {
        id: `handoff:field-finance`,
        from: `field`,
        to: `finance`,
        label: `Field → Finance`,
        point: {
            x: 915,
            y: 385
        },
        path: `M900 290 Q920 420 810 470`,
        manual: !0,
        what: `Mick completes the installation and gutter variation.`,
        information: `Completion, customer approval, varied scope, materials and labour.`,
        how: `A conversation or message that may not reach accounts.`,
        next: `Ange prepares the progress claim and final invoice.`,
        friction: {
            title: `The variation never reaches the invoice`,
            happening: `Extra gutter work is done, but finance still sees the original quote.`,
            matters: `Delivered work goes unbilled and reported margin is misleading.`,
            costs: [`Margin`, `Visibility`]
        },
        future: {
            action: `Connect`,
            title: `Bill the work that was actually delivered`,
            steps: [`Raise the variation on site`, `Price and approve it`, `Attach approval to the job`, `Include it in the invoice`],
            result: `Ange checks the invoice against delivered work, including variations.`
        }
    }, {
        id: `handoff:finance-service`,
        from: `finance`,
        to: `service`,
        label: `Finance → Service`,
        point: {
            x: 665,
            y: 510
        },
        path: `M810 470 Q665 550 520 490`,
        manual: !0,
        what: `The finished job becomes an ongoing customer relationship.`,
        information: `Installed specifications, completion photos, invoice and service history.`,
        how: `History is found across files, accounts and colleagues.`,
        next: `Whoever answers can identify Sarah’s job and help.`,
        friction: {
            title: `Sarah has to explain her own job again`,
            happening: `The phone and the customer record are strangers to each other.`,
            matters: `Support searches for context while the customer waits.`,
            costs: [`Customer patience`, `Time`]
        },
        future: {
            action: `Surface`,
            title: `Remember the customer before hello`,
            steps: [`Keep the job history together`, `Link incoming calls to the record`, `Show the installed specification`, `Record the service outcome`],
            result: `The next person starts where the last one finished.`
        }
    }],
    Ws = [{
        id: `system:forms`,
        department: `marketing`,
        category: `Forms & campaigns`,
        example: `Forms / Campaigns`,
        supports: `Enquiry capture and source attribution.`,
        receives: `Sarah’s enquiry and campaign source.`,
        sends: `A qualified lead to Sales.`
    }, {
        id: `system:crm`,
        department: `sales`,
        category: `CRM & calendar`,
        example: `CRM / Bookings / Sign`,
        supports: `Calls, visits, quotes and signature.`,
        receives: `The lead and source from Marketing.`,
        sends: `A signed scope and site information to Operations.`
    }, {
        id: `system:projects`,
        department: `operations`,
        category: `Projects & files`,
        example: `Projects / WorkDrive`,
        supports: `Project creation, scheduling and complete job packs.`,
        receives: `Scope, photos and access notes from Sales.`,
        sends: `The scheduled job to Mick’s crew.`
    }, {
        id: `system:field`,
        department: `field`,
        category: `Field tools & chat`,
        example: `FSM / Cliq`,
        supports: `Checklists, completion photos and variation approvals.`,
        receives: `The job pack from Operations.`,
        sends: `Completed work and variations to Finance.`
    }, {
        id: `system:accounts`,
        department: `finance`,
        category: `Accounting`,
        example: `Books / Expense`,
        supports: `Invoices, payment and actual job margin.`,
        receives: `Agreed price, approved variations and costs.`,
        sends: `Payment status and margin to Leadership.`
    }, {
        id: `system:service`,
        department: `service`,
        category: `Phone & service desk`,
        example: `Voice / Desk`,
        supports: `Customer recognition and service history.`,
        receives: `Job specifications and completion history.`,
        sends: `Service outcomes to the shared record.`
    }, {
        id: `system:people`,
        department: `people`,
        category: `Rosters & training`,
        example: `People / Shifts / Learn`,
        supports: `Crew availability, leave and current qualifications.`,
        receives: `Staff availability and training records.`,
        sends: `Available, qualified crews to Operations.`
    }, {
        id: `system:reporting`,
        department: `leadership`,
        category: `Reporting`,
        example: `Analytics / DataPrep`,
        supports: `Cross-department visibility from recorded work.`,
        receives: `Source, scope, schedule, actual costs and service outcomes.`,
        sends: `Evidence for decisions on capacity and margin.`
    }],
    Gs = {
        marketing: `Demand, attribution and the first impression. Which spend actually produces customers?`,
        sales: `The relationship, scope, price and commitment. Every call, quote and signature.`,
        operations: `Sequence, scheduling and accountability. Is the work we sold happening on time?`,
        field: `The moment the customer judges the business. Does the crew have what it needs?`,
        finance: `Cash, margin and the truth. Invoices reflect the work actually delivered.`,
        service: `Everything after handover, where retention and referral are won.`,
        people: `Capacity, availability, training and current tickets. The right people, ready to work.`,
        leadership: `The bigger picture, made possible by work recorded properly across the business.`
    },
    Ks = [`Source + enquiry`, `Requirements + appointment`, `Measurements + photos`, `Priced scope + signature`, `Schedule + job pack`, `Completion + variation`, `Invoice + payment`, `Service + referral`],
    qs = [{
        id: `journey:1`,
        label: `Enquiry`,
        department: `marketing`,
        x: 270,
        y: 185,
        labelDy: 27
    }, {
        id: `journey:2`,
        label: `Contact`,
        department: `sales`,
        x: 375,
        y: 158,
        labelDy: 27
    }, {
        id: `journey:4`,
        label: `Site Visit`,
        department: `sales`,
        x: 480,
        y: 158,
        labelDy: 27
    }, {
        id: `journey:5`,
        label: `Quote`,
        department: `sales`,
        x: 585,
        y: 158,
        labelDy: 27
    }, {
        id: `journey:6`,
        label: `Approval`,
        department: `sales`,
        x: 690,
        y: 158,
        labelDy: 27
    }, {
        id: `journey:operations`,
        label: `Handover`,
        department: `operations`,
        x: 790,
        y: 210,
        labelDy: -20
    }, {
        id: `journey:7`,
        label: `Installation`,
        department: `field`,
        x: 790,
        y: 315,
        labelDy: 27
    }, {
        id: `journey:8`,
        label: `Variation`,
        department: `field`,
        x: 735,
        y: 399,
        labelDy: -19
    }, {
        id: `journey:9`,
        label: `Invoice`,
        department: `finance`,
        x: 620,
        y: 420,
        labelDy: 26
    }, {
        id: `journey:10`,
        label: `Service`,
        department: `service`,
        x: 490,
        y: 410,
        labelDy: 26
    }, {
        id: `journey:11`,
        label: `Referral`,
        department: `marketing`,
        x: 285,
        y: 335,
        labelDy: 27
    }],
    Js = `M270 185 Q310 158 375 158 L690 158 Q790 158 790 210 L790 315 Q790 399 735 399 Q680 420 620 420 Q550 420 490 410 Q285 410 285 335`;
Bs.push({
    id: `journey:operations`,
    label: `Handover`,
    when: `Week one`,
    quote: `Someone rang before the crew turned up. I knew what was happening and when.`,
    never: `ring and ask where things were up to.`,
    department: `operations`,
    contribution: `Schedule + job pack`
}), Q.departments.find(e => e.id === `people`).name = `People & HR`;
var Ys = {
        customer: {
            title: `Sarah’s journey, over the business behind it.`,
            caption: `Follow the numbered thread. Select a moment to hear her experience.`
        },
        people: {
            title: `The same journey. The people who make it happen.`,
            caption: `The customer thread stays underneath as each person comes into view.`
        },
        process: {
            title: `Look between the departments.`,
            caption: `Continuous lines carry a defined handover. Dashed lines still depend on a person.`
        },
        systems: {
            title: `Where the information lives.`,
            caption: `Generic categories first. Select a tool to see what it receives and passes on.`
        },
        friction: {
            title: `The gaps are where work gets done twice.`,
            caption: `Select a marked handover to see the time, margin or context at risk.`
        },
        future: {
            title: `Improve the same connections, one at a time.`,
            caption: `Each proposed improvement repairs a specific handover. Nothing here is a live integration.`
        }
    },
    Xs = {
        customer: `Identity + requirements`,
        people: `Contributions from every person`,
        process: `Status + the next handover`,
        systems: `Information linked to its source`,
        friction: `Missing context · duplicate entry`,
        future: `One connected record`
    },
    Zs = {
        dave: [`Site visit`, `Measurements`, `Photos`, `Notes`, `Quote`],
        priya: [`Reconstruct job`, `Locate photos`, `Create project`, `Schedule crew`],
        priyaFuture: [`Project created`, `Photos + scope attached`, `Notification received`, `Ready to schedule`]
    },
    Qs = [{
        id: `whole`,
        eyebrow: `THE WHOLE BUSINESS`,
        title: `She sees one business. You see what connects it.`,
        caption: `Most customers only experience the outside of your business.`,
        layers: [],
        note: `Start with the business, not software. Ask the client to recognise their own operating areas in this map.`
    }, {
        id: `customer`,
        eyebrow: `01 / CUSTOMER`,
        title: `She never saw a single app.`,
        caption: `Follow Sarah from her first enquiry to the neighbour she refers.`,
        layers: [`customer`],
        note: `Tap a journey point. This is the good experience described in the source scenario. We will reveal the gaps that can prevent it.`
    }, {
        id: `people`,
        eyebrow: `02 / PEOPLE`,
        title: `One experience. Many people making it happen.`,
        caption: `Dave, Priya, Mick, Ange and whoever answers the phone.`,
        layers: [`people`],
        note: `Open a person. Show their day and what a connected business lets them stop doing.`
    }, {
        id: `process`,
        eyebrow: `03 / PROCESS`,
        title: `The work is only as good as the handover.`,
        caption: `Follow the joins between the departments, not just the tasks inside them.`,
        layers: [`process`],
        note: `A dashed line is a manual handover. A continuous line carries a defined job pack or record. Ask how these handovers happen today.`
    }, {
        id: `systems`,
        eyebrow: `04 / SYSTEMS`,
        title: `The technology sits underneath the work.`,
        caption: `Now reveal where information lives and where it needs to go.`,
        layers: [`systems`],
        note: `Categories first. Product names are illustrative examples from the prototype, not a prescribed stack or audited current inventory.`
    }, {
        id: `friction`,
        eyebrow: `05 / FRICTION`,
        title: `The gaps are where the business does work twice.`,
        caption: `Waiting. Chasing. Re-entering. Relying on somebody’s memory.`,
        layers: [`friction`],
        note: `These are illustrative failure scenarios. Ask which feels familiar. Do not imply we have audited this client.`
    }, {
        id: `handover`,
        eyebrow: `LOOK CLOSER / SALES → OPERATIONS`,
        title: `A signed quote should not wait for a conversation.`,
        caption: `Dave has the information. Priya still has to reconstruct it.`,
        layers: [`friction`],
        focus: `handoff:sales-operations`,
        note: `Stop here. Ask: “How does this actually move today?” Let the client explain before proposing a fix.`
    }, {
        id: `repair`,
        eyebrow: `06 / FUTURE`,
        title: `Fix this handover. Keep the context.`,
        caption: `A signature creates the project, carries the photos and notifies Priya.`,
        layers: [`future`],
        focus: `handoff:sales-operations`,
        note: `Walk through the proposed steps. Confirm the project template, required information, exceptions and ownership before automating anything.`
    }, {
        id: `future`,
        eyebrow: `BACK TO THE BUSINESS`,
        title: `The same business. Fewer gaps to carry.`,
        caption: `Connect one handover at a time. Keep ownership clear.`,
        layers: [`future`],
        note: `Start with one shared customer record, close the loudest gap, then improve each handover. These are proposed improvements, not implemented integrations.`
    }, {
        id: `leadership`,
        eyebrow: `LEADERSHIP`,
        title: `Monday, 7:30am. One screen. Nobody prepared it.`,
        caption: `Better visibility comes from recording the work properly in the first place.`,
        layers: [`future`],
        focus: `department:leadership`,
        note: `These are questions that become answerable, not live metrics. The inputs come from people simply doing their jobs.`
    }, {
        id: `test`,
        eyebrow: `THE TEST`,
        title: `The apps aren’t the point. The thread is.`,
        caption: `Pick one customer you delivered for last month. Can you follow the whole thread?`,
        layers: [`customer`],
        focus: `test`,
        note: `Ask whether they can follow enquiry, quote, signature, job, variation, invoice and service without opening another system, ringing a colleague or searching an inbox.`
    }];

function $s(e, t) {
    (e.key === `Enter` || e.key === ` `) && (e.preventDefault(), t())
}

function ec({
    active: e,
    onSelect: t,
    focus: n = ``,
    revealed: r,
    visited: i
}) {
    let a = t => e.includes(t),
        o = a(`friction`),
        s = a(`future`),
        c = Us.find(e => e.id === n || n.startsWith(e.id + `/`)),
        l = Hs.find(e => e.id === n || n.startsWith(e.id + `/`)),
        u = Ws.find(e => e.id === n),
        d = qs.find(e => e.id === n),
        f = Q.departments.find(e => e.id === n.replace(`department:`, ``) || e.id === l ?.department || e.id === u ?.department || e.id === d ?.department),
        p = !!c || !!f || n === `record`,
        m = c ? (Q.departments.find(e => e.id === c.from).x + Q.departments.find(e => e.id === c.to).x) / 2 : f ?.x ?? 520,
        h = c ? (Q.departments.find(e => e.id === c.from).y + Q.departments.find(e => e.id === c.to).y) / 2 : f ?.y ?? 290,
        g = p ? c ? n.includes(`/`) ? 1.22 : 1.1 : n.includes(`/`) ? 1.6 : 1.3 : 1,
        _ = p ? `translate(${(c?300:335)-m*g}px,${(c?195:285)-h*g}px) scale(${g})` : `translate(0px,0px) scale(1)`,
        v = a(`customer`) ? 1 : e.length ? .25 : 0,
        y = a(`people`) ? 1 : e.some(e => [`process`, `systems`, `friction`, `future`].includes(e)) ? .23 : 0,
        b = a(`process`) || o || s || c ? 1 : a(`systems`) ? .25 : 0;
    return (0, D.jsx)(`div`, {
        className: `map-canvas ` + (p ? `is-focused ` : ``) + (o ? `friction` : ``),
        children: (0, D.jsxs)(`svg`, {
            viewBox: `0 0 1040 590`,
            "aria-label": `${Q.name} business anatomy map`,
            children: [(0, D.jsxs)(`defs`, {
                children: [(0, D.jsx)(`pattern`, {
                    id: `dots`,
                    width: `24`,
                    height: `24`,
                    patternUnits: `userSpaceOnUse`,
                    children: (0, D.jsx)(`circle`, {
                        cx: `1`,
                        cy: `1`,
                        r: `.7`,
                        fill: `#dce4eb`
                    })
                }), (0, D.jsx)(`marker`, {
                    id: `flow-arrow`,
                    markerWidth: `7`,
                    markerHeight: `7`,
                    refX: `5`,
                    refY: `3.5`,
                    orient: `auto`,
                    children: (0, D.jsx)(`path`, {
                        d: `M0 0L6 3.5L0 7`,
                        fill: `none`,
                        stroke: `currentColor`,
                        strokeWidth: `1.2`
                    })
                })]
            }), (0, D.jsx)(`rect`, {
                width: `1040`,
                height: `590`,
                fill: `url(#dots)`
            }), (0, D.jsxs)(`g`, {
                className: `map-world`,
                style: {
                    transform: _
                },
                children: [(0, D.jsxs)(`g`, {
                    className: `business-skeleton`,
                    style: {
                        opacity: o ? .45 : 1
                    },
                    children: [(0, D.jsx)(`path`, {
                        d: `M230 110 Q520 -5 810 110 Q985 290 810 470 Q520 585 230 470 Q55 290 230 110Z`,
                        fill: `none`,
                        stroke: `#e5ebef`,
                        strokeDasharray: `3 7`
                    }), Q.departments.map(e => (0, D.jsx)(`path`, {
                        d: `M520 290 Q${e.x} 290 ${e.x} ${e.y}`,
                        fill: `none`,
                        stroke: `#e1e8ec`,
                        strokeWidth: `1`
                    }, e.id))]
                }), (0, D.jsx)(`g`, {
                    className: `anatomy-overlay process-overlay`,
                    style: {
                        opacity: b,
                        pointerEvents: b === 1 ? `auto` : `none`
                    },
                    "aria-hidden": b !== 1,
                    children: Us.map(e => (0, D.jsxs)(`g`, {
                        className: `flow ` + (e.manual ? `manual` : `healthy`),
                        style: {
                            opacity: c && c.id !== e.id ? .12 : o && !e.manual ? .22 : 1
                        },
                        children: [(0, D.jsx)(`path`, {
                            d: e.path,
                            fill: `none`,
                            stroke: e.manual && o ? `#b86b3e` : s && e.manual ? `#0e8c8c` : `#6d8fa0`,
                            strokeWidth: e.manual && (o || s) ? 2.7 : 1.6,
                            strokeDasharray: e.manual && !s ? `5 6` : `none`
                        }), (0, D.jsxs)(`g`, {
                            role: `button`,
                            tabIndex: b === 1 ? 0 : -1,
                            "aria-label": e.label + ` handoff`,
                            onClick: () => t(e.id),
                            onKeyDown: n => $s(n, () => t(e.id)),
                            transform: `translate(${e.point.x},${e.point.y})`,
                            children: [(0, D.jsx)(`circle`, {
                                r: `19`,
                                fill: `transparent`
                            }), (0, D.jsx)(`circle`, {
                                r: `12`,
                                fill: o && e.manual ? `#b86b3e` : `#fff`,
                                stroke: o && e.manual ? `#b86b3e` : s ? `#0e8c8c` : `#6d8fa0`
                            }), (0, D.jsx)(`text`, {
                                y: `4`,
                                textAnchor: `middle`,
                                fontSize: `13`,
                                fill: o && e.manual ? `white` : s ? `#0e8c8c` : `#536f80`,
                                children: o && e.manual ? `!` : s && e.manual ? `✓` : `→`
                            }), (0, D.jsx)(`title`, {
                                children: o ? e.friction.title : s ? e.future.title : e.label
                            }), e.manual && (o || s) && !c && (0, D.jsxs)(`g`, {
                                children: [(0, D.jsx)(`rect`, {
                                    x: `-86`,
                                    y: e.point.y > 400 ? 16 : -41,
                                    width: `172`,
                                    height: `23`,
                                    rx: `5`,
                                    fill: o ? `#fbf0e9` : `#eaf5f2`
                                }), (0, D.jsx)(`text`, {
                                    textAnchor: `middle`,
                                    className: `flow-label`,
                                    fill: o ? `#9f572e` : `#087576`,
                                    y: e.point.y > 400 ? 32 : -25,
                                    children: o ? e.from === `sales` ? `Context carried manually` : e.from === `field` ? `Variation goes unbilled` : `History missing` : e.future.action + ` this handover`
                                })]
                            })]
                        })]
                    }, e.id))
                }), Q.departments.map((e, n) => {
                    let r = f ?.id === e.id || c ?.from === e.id || c ?.to === e.id;
                    return (0, D.jsxs)(`g`, {
                        className: `department ` + (r ? `selected` : ``),
                        role: `button`,
                        tabIndex: 0,
                        "aria-label": e.name,
                        "data-department": e.id,
                        onClick: () => t(`department:` + e.id),
                        onKeyDown: n => $s(n, () => t(`department:` + e.id)),
                        transform: `translate(${e.x},${e.y})`,
                        style: {
                            opacity: p && !r ? .22 : o && ![`sales`, `operations`, `field`, `finance`, `service`].includes(e.id) ? .4 : 1
                        },
                        children: [(0, D.jsx)(`rect`, {
                            x: `-100`,
                            y: `-39`,
                            width: `200`,
                            height: `78`,
                            rx: `10`
                        }), (0, D.jsxs)(`text`, {
                            className: `node-index`,
                            x: `-83`,
                            y: `-18`,
                            children: [`0`, n + 1]
                        }), (0, D.jsx)(`text`, {
                            className: `node-title`,
                            x: `0`,
                            y: `3`,
                            textAnchor: `middle`,
                            children: e.name
                        }), (0, D.jsx)(`text`, {
                            className: `node-subtitle`,
                            y: `25`,
                            textAnchor: `middle`,
                            children: e.short
                        })]
                    }, e.id)
                }), (0, D.jsxs)(`g`, {
                    className: `anatomy-overlay journey-overlay`,
                    style: {
                        opacity: p ? .07 : v,
                        pointerEvents: a(`customer`) && !p ? `auto` : `none`
                    },
                    "aria-hidden": !a(`customer`) || p,
                    children: [(0, D.jsx)(`path`, {
                        d: Js,
                        className: `journey-line-halo`
                    }), (0, D.jsx)(`path`, {
                        d: Js,
                        className: a(`customer`) ? `journey-line drawing` : `journey-line`,
                        pathLength: `1`
                    }), qs.map((e, n) => (0, D.jsxs)(`g`, {
                        className: `journey-node`,
                        role: `button`,
                        tabIndex: a(`customer`) && !p ? 0 : -1,
                        "aria-label": e.label + ` journey point`,
                        onClick: () => t(e.id),
                        onKeyDown: n => $s(n, () => t(e.id)),
                        transform: `translate(${e.x},${e.y})`,
                        children: [(0, D.jsx)(`circle`, {
                            r: `18`,
                            fill: `transparent`
                        }), (0, D.jsx)(`circle`, {
                            r: `9`,
                            fill: i.includes(e.id) ? `#0e8c8c` : `#fff`,
                            stroke: `#0e8c8c`,
                            strokeWidth: `1.7`
                        }), (0, D.jsx)(`text`, {
                            y: `3.7`,
                            textAnchor: `middle`,
                            className: `journey-num`,
                            fill: i.includes(e.id) ? `#fff` : `#087576`,
                            children: String(n + 1).padStart(2, `0`)
                        }), (0, D.jsx)(`text`, {
                            y: e.labelDy,
                            textAnchor: `middle`,
                            className: `journey-label`,
                            children: e.label
                        }), (0, D.jsx)(`title`, {
                            children: Bs.find(t => t.id === e.id) ?.quote
                        })]
                    }, e.id))]
                }), (0, D.jsx)(`g`, {
                    className: `anatomy-overlay people-overlay`,
                    style: {
                        opacity: c || l ? 1 : y,
                        pointerEvents: a(`people`) || c || l ? `auto` : `none`
                    },
                    "aria-hidden": !a(`people`) && !c && !l,
                    children: Hs.map(e => {
                        let n = Q.departments.find(t => t.id === e.department),
                            r = !p || c ?.from === n.id || c ?.to === n.id || f ?.id === n.id;
                        return (0, D.jsxs)(`g`, {
                            className: `person-marker`,
                            transform: `translate(${n.x},${n.y-39})`,
                            style: {
                                opacity: r ? 1 : .15
                            },
                            role: `button`,
                            tabIndex: a(`people`) || r && p ? 0 : -1,
                            "aria-label": e.name + ` — ` + e.role,
                            onClick: () => t(e.id),
                            onKeyDown: n => $s(n, () => t(e.id)),
                            children: [(0, D.jsx)(`rect`, {
                                x: `-100`,
                                y: `-32`,
                                width: `200`,
                                height: `31`,
                                rx: `16`
                            }), (0, D.jsx)(`circle`, {
                                cx: `-83`,
                                cy: `-16.5`,
                                r: `11`
                            }), (0, D.jsx)(`text`, {
                                x: `-83`,
                                y: `-12`,
                                textAnchor: `middle`,
                                className: `person-initial`,
                                children: e.name[0]
                            }), (0, D.jsx)(`text`, {
                                x: `4`,
                                y: `-12`,
                                textAnchor: `middle`,
                                className: `person-name`,
                                children: e.name === `The Phone` ? `Service · Support` : e.name === `Director` ? `Director · Leadership` : e.name + ` · ` + (e.name === `Priya` ? `Operations` : e.name === `Mick` ? `Crew leader` : e.name === `Ange` ? `Finance` : `Estimator`)
                            })]
                        }, e.id)
                    })
                }), (0, D.jsx)(`g`, {
                    className: `anatomy-overlay systems-overlay`,
                    style: {
                        opacity: a(`systems`) ? 1 : o || s ? .18 : 0,
                        pointerEvents: a(`systems`) ? `auto` : `none`
                    },
                    "aria-hidden": !a(`systems`),
                    children: Ws.map(e => {
                        let n = Q.departments.find(t => t.id === e.department);
                        return (0, D.jsxs)(`g`, {
                            className: `system-marker`,
                            transform: `translate(${n.x},${n.y+47})`,
                            role: `button`,
                            tabIndex: a(`systems`) ? 0 : -1,
                            "aria-label": e.category + ` system`,
                            onClick: () => t(e.id),
                            onKeyDown: n => $s(n, () => t(e.id)),
                            children: [(0, D.jsx)(`rect`, {
                                x: `-88`,
                                y: `-3`,
                                width: `176`,
                                height: `26`,
                                rx: `5`
                            }), (0, D.jsx)(`text`, {
                                x: `0`,
                                y: `14`,
                                textAnchor: `middle`,
                                children: e.category
                            })]
                        }, e.id)
                    })
                }), (0, D.jsxs)(`g`, {
                    className: `record`,
                    role: `button`,
                    tabIndex: 0,
                    "aria-label": `${Q.customer.name}’s shared record`,
                    onClick: () => t(`record`),
                    onKeyDown: e => $s(e, () => t(`record`)),
                    transform: `translate(520,290)`,
                    style: {
                        opacity: p && n !== `record` ? .45 : 1
                    },
                    children: [(0, D.jsx)(`rect`, {
                        x: `-119`,
                        y: `-71`,
                        width: `238`,
                        height: `142`,
                        rx: `15`
                    }), (0, D.jsx)(`text`, {
                        className: `record-eyebrow`,
                        y: `-40`,
                        textAnchor: `middle`,
                        children: `ONE CUSTOMER · ONE JOB`
                    }), (0, D.jsxs)(`text`, {
                        className: `record-title`,
                        y: `-4`,
                        textAnchor: `middle`,
                        children: [Q.customer.name, `’s record`]
                    }), (0, D.jsxs)(`text`, {
                        className: `record-subtitle`,
                        y: `19`,
                        textAnchor: `middle`,
                        children: [Q.customer.location, ` · Louvred roof`]
                    }), (0, D.jsx)(`line`, {
                        x1: `-89`,
                        x2: `89`,
                        y1: `36`,
                        y2: `36`,
                        stroke: `#355568`
                    }), (0, D.jsx)(`text`, {
                        className: `record-bottom`,
                        y: `56`,
                        textAnchor: `middle`,
                        children: Xs[e.at(-1) || ``] || `The shared memory of the business`
                    })]
                }), c && c.id !== `handoff:sales-operations` && (0, D.jsxs)(`g`, {
                    className: `focus-callout`,
                    transform: `translate(${m},${h+135})`,
                    children: [(0, D.jsx)(`rect`, {
                        x: `-115`,
                        y: `-28`,
                        width: `230`,
                        height: `60`,
                        rx: `8`,
                        fill: s ? `#edf7f4` : `#fbf0e9`,
                        stroke: s ? `#c7e3db` : `#ead5c6`
                    }), (0, D.jsx)(`text`, {
                        y: `-5`,
                        textAnchor: `middle`,
                        fontSize: `11`,
                        letterSpacing: `1`,
                        fill: s ? `#087576` : `#a05a32`,
                        children: s ? `CONTEXT TRAVELS WITH THE JOB` : `A PERSON CARRIES THE CONTEXT`
                    }), (0, D.jsx)(`text`, {
                        y: `16`,
                        textAnchor: `middle`,
                        fontSize: `13`,
                        fill: `#33475b`,
                        children: s ? `Captured once. Ready to use.` : `Email · phone · memory`
                    })]
                }), c ?.id === `handoff:sales-operations` && (0, D.jsxs)(`g`, {
                    className: `handoff-work`,
                    children: [(0, D.jsx)(`text`, {
                        x: `665`,
                        y: `107`,
                        textAnchor: `middle`,
                        className: `handoff-word`,
                        children: `HANDOFF`
                    }), (0, D.jsx)(`path`, {
                        d: `M625 121H700`,
                        stroke: s ? `#0e8c8c` : o ? `#b86b3e` : `#78909c`,
                        strokeWidth: `2`,
                        strokeDasharray: s ? `none` : `4 4`
                    }), (0, D.jsx)(`text`, {
                        x: `665`,
                        y: `145`,
                        textAnchor: `middle`,
                        className: `handoff-method`,
                        children: s ? `Connected` : o ? `Context at risk` : `Manual`
                    }), [{
                        x: 520,
                        y: 142,
                        items: Zs.dave
                    }, {
                        x: 810,
                        y: 162,
                        items: s ? Zs.priyaFuture : Zs.priya
                    }].map(e => (0, D.jsx)(`g`, {
                        children: e.items.map((t, n) => (0, D.jsx)(`text`, {
                            x: e.x,
                            y: e.y + n * 16,
                            textAnchor: `middle`,
                            className: `handoff-task`,
                            children: t
                        }, t))
                    }, e.x))]
                })]
            })]
        })
    })
}

function tc({
    active: e,
    mode: t,
    onChange: n
}) {
    return (0, D.jsxs)(`aside`, {
        className: `layer-rail`,
        children: [(0, D.jsxs)(`div`, {
            className: `rail-title`,
            children: [(0, D.jsx)(Ps, {
                size: 17
            }), (0, D.jsx)(`span`, {
                children: `ANATOMY LAYERS`
            })]
        }), (0, D.jsxs)(`p`, {
            className: `rail-hint`,
            children: [`A different view.`, (0, D.jsx)(`br`, {}), `The same business.`]
        }), (0, D.jsx)(`nav`, {
            "aria-label": `Anatomy layers`,
            children: zs.map((t, r) => (0, D.jsxs)(`button`, {
                className: `layer-button ` + (e.includes(t.id) ? `active` : ``),
                onClick: () => n(t.id),
                "aria-pressed": e.includes(t.id),
                "aria-label": t.name + ` layer`,
                children: [(0, D.jsxs)(`span`, {
                    className: `layer-number`,
                    children: [`0`, r + 1]
                }), (0, D.jsxs)(`span`, {
                    children: [(0, D.jsx)(`b`, {
                        children: t.name
                    }), (0, D.jsx)(`small`, {
                        children: t.hint
                    })]
                }), (0, D.jsx)(Ms, {
                    size: 14
                })]
            }, t.id))
        }), (0, D.jsx)(`div`, {
            className: `rail-bottom`,
            children: t === `explore` ? (0, D.jsxs)(D.Fragment, {
                children: [`Combine up to two layers.`, (0, D.jsx)(`br`, {}), (0, D.jsx)(`strong`, {
                    children: `Follow the same thread.`
                })]
            }) : (0, D.jsxs)(D.Fragment, {
                children: [`The apps aren’t the point.`, (0, D.jsx)(`br`, {}), (0, D.jsx)(`strong`, {
                    children: `The thread is.`
                })]
            })
        })]
    })
}

function nc({ ...e
}) {
    return (0, D.jsx)(ii, {
        "data-slot": `sheet`,
        ...e
    })
}

function rc({ ...e
}) {
    return (0, D.jsx)(ci, {
        "data-slot": `sheet-portal`,
        ...e
    })
}

function ic({
    className: e,
    ...t
}) {
    return (0, D.jsx)(ui, {
        "data-slot": `sheet-overlay`,
        className: ms(`fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0`, e),
        ...t
    })
}

function ac({
    className: e,
    children: t,
    side: n = `right`,
    showCloseButton: r = !0,
    ...i
}) {
    return (0, D.jsxs)(rc, {
        children: [(0, D.jsx)(ic, {}), (0, D.jsxs)(mi, {
            "data-slot": `sheet-content`,
            className: ms(`fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500`, n === `right` && `inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm`, n === `left` && `inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm`, n === `top` && `inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top`, n === `bottom` && `inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom`, e),
            ...i,
            children: [t, r && (0, D.jsxs)(Ci, {
                className: `absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary`,
                children: [(0, D.jsx)(Ls, {
                    className: `size-4`
                }), (0, D.jsx)(`span`, {
                    className: `sr-only`,
                    children: `Close`
                })]
            })]
        })]
    })
}

function oc({
    className: e,
    ...t
}) {
    return (0, D.jsx)(`div`, {
        "data-slot": `sheet-header`,
        className: ms(`flex flex-col gap-1.5 p-4`, e),
        ...t
    })
}

function sc({
    className: e,
    ...t
}) {
    return (0, D.jsx)(yi, {
        "data-slot": `sheet-title`,
        className: ms(`font-semibold text-foreground`, e),
        ...t
    })
}

function cc({
    className: e,
    ...t
}) {
    return (0, D.jsx)(xi, {
        "data-slot": `sheet-description`,
        className: ms(`text-sm text-muted-foreground`, e),
        ...t
    })
}

function lc({
    path: e,
    onBack: t,
    onSelect: n,
    future: r,
    onFuture: i,
    revealed: a,
    comparison: o,
    onComparison: s,
    onNext: c,
    onPrevious: l
}) {
    let u = e.at(-1) || ``,
        [d, f] = u.split(`/`),
        p = Us.find(e => e.id === d),
        m = Hs.find(e => e.id === d),
        h = Bs.find(e => e.id === d),
        g = Ws.find(e => e.id === d),
        _ = Q.departments.find(e => d === `department:` + e.id),
        v = p ? f ? `Quote accepted → project creation` : p.label : m ? f ? m.beats[Number(f)].title : m.name : h ? h.label === `Signature` ? `Approval` : h.label : g ? g.category : _ ? _.name : d === `test` ? `Can you follow one customer?` : `${Q.customer.name}’s record`,
        y = p ? `THE HANDOVER` : m ? m.role : h ? h.when : g ? `INFORMATION UNDER THE WORK` : _ ? `BUSINESS AREA` : d === `test` ? `ONE MINUTE. ONE QUESTION.` : `THE SHARED MEMORY`;
    return (0, D.jsx)(nc, {
        open: !!u,
        modal: !1,
        onOpenChange: e => {
            e || t()
        },
        children: (0, D.jsxs)(ac, {
            className: `anatomy-detail`,
            showCloseButton: !1,
            onInteractOutside: e => e.preventDefault(),
            onEscapeKeyDown: e => {
                e.preventDefault(), t()
            },
            onCloseAutoFocus: e => e.preventDefault(),
            children: [(0, D.jsxs)(`div`, {
                className: `detail-back`,
                children: [(0, D.jsxs)(`button`, {
                    onClick: t,
                    children: [(0, D.jsx)(As, {
                        size: 15
                    }), e.length > 1 ? `Back to ` + uc(e[e.length - 2]) : `Back to business`]
                }), (0, D.jsxs)(`span`, {
                    children: [e.length + 1, ` / 4`]
                })]
            }), (0, D.jsxs)(oc, {
                className: `detail-heading`,
                children: [(0, D.jsx)(cc, {
                    className: `eyebrow`,
                    children: y
                }), (0, D.jsx)(sc, {
                    children: v
                })]
            }), (0, D.jsxs)(`div`, {
                className: `detail-body`,
                children: [p && (0, D.jsxs)(D.Fragment, {
                    children: [(0, D.jsx)(hs, {
                        value: o,
                        onValueChange: s,
                        children: (0, D.jsxs)(_s, {
                            className: `state-tabs`,
                            children: [(0, D.jsx)(vs, {
                                value: `current`,
                                children: `Current`
                            }), (0, D.jsx)(vs, {
                                value: `friction`,
                                children: `Friction`
                            }), (0, D.jsx)(vs, {
                                value: `future`,
                                children: `Future`
                            })]
                        })
                    }), (0, D.jsxs)(`p`, {
                        className: `scenario-label`,
                        children: [`Illustrative `, r ? `proposed improvement` : `failure scenario`]
                    }), r ? (0, D.jsxs)(D.Fragment, {
                        children: [(0, D.jsx)(`h3`, {
                            children: p.future.title
                        }), (0, D.jsx)(`ol`, {
                            className: `future-steps`,
                            children: p.future.steps.map((e, t) => (0, D.jsxs)(`li`, {
                                children: [(0, D.jsx)(`span`, {
                                    children: t + 1
                                }), e]
                            }, e))
                        }), (0, D.jsxs)(`div`, {
                            className: `benefit`,
                            children: [(0, D.jsx)(Ms, {
                                size: 17
                            }), (0, D.jsx)(`p`, {
                                children: p.future.result
                            })]
                        }), (0, D.jsx)($, {
                            label: `What changes`,
                            text: `The information is captured once and carried with the job. The next person checks it instead of recreating it.`
                        })]
                    }) : (0, D.jsxs)(D.Fragment, {
                        children: [(0, D.jsxs)(`div`, {
                            className: `discovery`,
                            children: [(0, D.jsx)(`span`, {
                                children: `HOW DOES THIS MOVE TODAY?`
                            }), (0, D.jsxs)(`p`, {
                                children: [`Automatic, email, phone call…`, (0, D.jsx)(`br`, {}), `or somebody remembers?`]
                            })]
                        }), (0, D.jsx)($, {
                            label: `What happens`,
                            text: p.what
                        }), (0, D.jsx)($, {
                            label: `What information moves`,
                            text: p.information
                        }), (0, D.jsx)($, {
                            label: `How it moves`,
                            text: p.how
                        }), (0, D.jsx)($, {
                            label: `What happens next`,
                            text: p.next
                        }), o === `friction` && (0, D.jsxs)(`div`, {
                            className: `friction-detail`,
                            children: [(0, D.jsx)(`p`, {
                                className: `eyebrow`,
                                children: `WHERE THE THREAD BREAKS`
                            }), (0, D.jsx)(`h3`, {
                                children: p.friction.title
                            }), (0, D.jsx)(`p`, {
                                children: p.friction.happening
                            }), (0, D.jsx)(`p`, {
                                children: p.friction.matters
                            }), (0, D.jsx)(`div`, {
                                className: `costs`,
                                children: p.friction.costs.map(e => (0, D.jsx)(`span`, {
                                    children: e
                                }, e))
                            }), (0, D.jsxs)(`ul`, {
                                className: `friction-risks`,
                                children: [(0, D.jsx)(`li`, {
                                    children: `Duplicate work`
                                }), (0, D.jsx)(`li`, {
                                    children: `Missing context risk`
                                }), (0, D.jsx)(`li`, {
                                    children: `Scheduling delay`
                                }), (0, D.jsx)(`li`, {
                                    children: `Customer may be asked again`
                                })]
                            })]
                        })]
                    }), !f && p.id === `handoff:sales-operations` && (0, D.jsxs)(`button`, {
                        className: `detail-link`,
                        onClick: () => n(p.id + `/0`),
                        children: [`Inspect quote → project `, (0, D.jsx)(Ns, {
                            size: 16
                        })]
                    }), !r && (0, D.jsxs)(`button`, {
                        className: `primary detail-cta`,
                        onClick: () => i(!0),
                        children: [`See this handover connected `, (0, D.jsx)(js, {
                            size: 16
                        })]
                    })]
                }), m && (0, D.jsx)(D.Fragment, {
                    children: f === void 0 ? (0, D.jsxs)(D.Fragment, {
                        children: [(0, D.jsx)(`p`, {
                            className: `scenario-label`,
                            children: `A day in the connected business`
                        }), (0, D.jsxs)(`div`, {
                            className: `person-intro`,
                            children: [(0, D.jsx)(`span`, {
                                children: m.name[0]
                            }), (0, D.jsxs)(`div`, {
                                children: [(0, D.jsx)(`b`, {
                                    children: m.name
                                }), (0, D.jsx)(`small`, {
                                    children: m.role
                                })]
                            })]
                        }), m.beats.map((e, t) => (0, D.jsxs)(`button`, {
                            className: `beat-row`,
                            onClick: () => n(m.id + `/` + t),
                            children: [(0, D.jsxs)(`span`, {
                                children: [`0`, t + 1]
                            }), (0, D.jsxs)(`div`, {
                                children: [(0, D.jsx)(`b`, {
                                    children: e.title
                                }), (0, D.jsx)(`p`, {
                                    children: e.body
                                })]
                            }), (0, D.jsx)(Ns, {
                                size: 15
                            })]
                        }, e.title))]
                    }) : (0, D.jsxs)(D.Fragment, {
                        children: [(0, D.jsxs)(`div`, {
                            className: `person-intro`,
                            children: [(0, D.jsx)(`span`, {
                                children: m.name[0]
                            }), (0, D.jsxs)(`div`, {
                                children: [(0, D.jsx)(`b`, {
                                    children: m.name
                                }), (0, D.jsx)(`small`, {
                                    children: m.role
                                })]
                            })]
                        }), (0, D.jsx)(`p`, {
                            className: `leaf-copy`,
                            children: m.beats[Number(f)].body
                        }), (0, D.jsxs)(`div`, {
                            className: `leaf-nav`,
                            children: [(0, D.jsxs)(`button`, {
                                disabled: Number(f) === 0,
                                onClick: () => n(m.id + `/` + (Number(f) - 1)),
                                children: [(0, D.jsx)(As, {
                                    size: 16
                                }), ` Previous beat`]
                            }), (0, D.jsxs)(`button`, {
                                disabled: Number(f) === m.beats.length - 1,
                                onClick: () => n(m.id + `/` + (Number(f) + 1)),
                                children: [`Next beat `, (0, D.jsx)(js, {
                                    size: 16
                                })]
                            })]
                        })]
                    })
                }), h && (0, D.jsxs)(D.Fragment, {
                    children: [(0, D.jsx)(`p`, {
                        className: `scenario-label`,
                        children: `The intended customer experience`
                    }), (0, D.jsxs)(`blockquote`, {
                        children: [`“`, h.quote, `”`]
                    }), (0, D.jsx)($, {
                        label: `She never had to`,
                        text: h.never
                    }), (0, D.jsxs)(`div`, {
                        className: `record-add`,
                        children: [(0, D.jsx)(`span`, {
                            children: `ADDED TO THE SHARED RECORD`
                        }), (0, D.jsxs)(`p`, {
                            children: [(0, D.jsx)(Ms, {
                                size: 16
                            }), h.contribution]
                        })]
                    }), (0, D.jsxs)(`button`, {
                        className: `detail-link`,
                        onClick: () => n(`department:` + h.department),
                        children: [`See the business area behind this `, (0, D.jsx)(Ns, {
                            size: 16
                        })]
                    })]
                }), g && (0, D.jsxs)(D.Fragment, {
                    children: [(0, D.jsx)(`p`, {
                        className: `scenario-label`,
                        children: `Illustrative category, not an audited inventory`
                    }), (0, D.jsx)($, {
                        label: `Used by`,
                        text: Q.departments.find(e => e.id === g.department).person
                    }), (0, D.jsx)($, {
                        label: `Supports`,
                        text: g.supports
                    }), (0, D.jsx)($, {
                        label: `Receives from`,
                        text: g.receives
                    }), (0, D.jsx)($, {
                        label: `Sends to`,
                        text: g.sends
                    }), (0, D.jsxs)(`div`, {
                        className: `tool-example`,
                        children: [(0, D.jsx)(`small`, {
                            children: `Examples from the source prototype`
                        }), (0, D.jsx)(`p`, {
                            children: g.example
                        }), (0, D.jsx)(`small`, {
                            children: `The client’s stack can be different.`
                        })]
                    })]
                }), _ && (0, D.jsxs)(D.Fragment, {
                    children: [(0, D.jsx)(`p`, {
                        className: `department-description`,
                        children: Gs[_.id]
                    }), _.id === `leadership` ? (0, D.jsxs)(D.Fragment, {
                        children: [(0, D.jsx)(`h3`, {
                            children: `Questions that become answerable`
                        }), Vs.map(e => (0, D.jsxs)(`div`, {
                            className: `leadership-question`,
                            children: [(0, D.jsx)(`p`, {
                                children: e.question
                            }), (0, D.jsx)(`small`, {
                                children: e.source
                            })]
                        }, e.question)), (0, D.jsx)(`p`, {
                            className: `scenario-label`,
                            children: `Proposed visibility from recorded work. No live metrics.`
                        })]
                    }) : (0, D.jsxs)(D.Fragment, {
                        children: [Hs.filter(e => e.department === _.id).map(e => (0, D.jsxs)(`button`, {
                            className: `detail-link person-link`,
                            onClick: () => n(e.id),
                            children: [(0, D.jsx)(`span`, {
                                className: `small-avatar`,
                                children: e.name[0]
                            }), (0, D.jsxs)(`span`, {
                                children: [(0, D.jsx)(`b`, {
                                    children: e.name
                                }), (0, D.jsx)(`small`, {
                                    children: e.role
                                })]
                            }), (0, D.jsx)(Ns, {
                                size: 16
                            })]
                        }, e.id)), (0, D.jsx)($, {
                            label: `Contributes to the record`,
                            text: _.contribution
                        }), (0, D.jsx)(`p`, {
                            className: `eyebrow`,
                            children: `CONNECTED HANDOVERS`
                        }), Us.filter(e => e.from === _.id || e.to === _.id).map(e => (0, D.jsxs)(`button`, {
                            className: `detail-link`,
                            onClick: () => n(e.id),
                            children: [e.label, (0, D.jsx)(Ns, {
                                size: 16
                            })]
                        }, e.id)), _.id === `people` && (0, D.jsx)($, {
                            label: `People & HR → Operations`,
                            text: `Crew availability, leave and current qualifications inform the schedule. Check readiness before assigning the job.`
                        })]
                    })]
                }), d === `record` && (0, D.jsxs)(D.Fragment, {
                    children: [(0, D.jsx)(`p`, {
                        className: `department-description`,
                        children: `One customer. One job. One thread. Each person adds what the next person needs.`
                    }), (0, D.jsx)(`div`, {
                        className: `record-list`,
                        children: Ks.map((e, t) => (0, D.jsxs)(`div`, {
                            className: t < a ? `revealed` : ``,
                            children: [(0, D.jsx)(`span`, {
                                children: t < a ? (0, D.jsx)(Ms, {
                                    size: 15
                                }) : t + 1
                            }), (0, D.jsx)(`p`, {
                                children: e
                            })]
                        }, e))
                    }), (0, D.jsxs)(`p`, {
                        className: `scenario-label`,
                        children: [a, ` of `, Ks.length, ` contributions revealed in this presentation. This is a conceptual shared record.`]
                    })]
                }), d === `test` && (0, D.jsxs)(D.Fragment, {
                    children: [(0, D.jsx)(`p`, {
                        className: `leaf-copy`,
                        children: `Pick a customer you delivered for last month.`
                    }), (0, D.jsx)(`div`, {
                        className: `test-thread`,
                        children: `Enquiry → Quote → Signature → Job → Variation → Invoice → Service`
                    }), (0, D.jsx)(`h3`, {
                        children: `Can you follow them without…`
                    }), (0, D.jsxs)(`ul`, {
                        className: `test-list`,
                        children: [(0, D.jsx)(`li`, {
                            children: `Opening a second system?`
                        }), (0, D.jsx)(`li`, {
                            children: `Ringing a colleague?`
                        }), (0, D.jsx)(`li`, {
                            children: `Searching an inbox?`
                        })]
                    }), (0, D.jsx)(`div`, {
                        className: `benefit`,
                        children: (0, D.jsx)(`p`, {
                            children: `Every gap you have to jump is somewhere the business loses time, margin or a customer’s patience.`
                        })
                    }), (0, D.jsxs)(`h3`, {
                        className: `test-ending`,
                        children: [`The apps aren’t the point.`, (0, D.jsx)(`br`, {}), `The thread is.`]
                    })]
                })]
            }), (c || l) && (0, D.jsxs)(`div`, {
                className: `detail-presenter-controls`,
                children: [(0, D.jsxs)(`button`, {
                    disabled: !l,
                    onClick: l,
                    children: [(0, D.jsx)(As, {
                        size: 15
                    }), ` Previous frame`]
                }), (0, D.jsxs)(`button`, {
                    disabled: !c,
                    onClick: c,
                    children: [`Next frame `, (0, D.jsx)(js, {
                        size: 15
                    })]
                })]
            })]
        })
    })
}

function $({
    label: e,
    text: t
}) {
    return (0, D.jsxs)(`section`, {
        className: `detail-section`,
        children: [(0, D.jsx)(`h3`, {
            children: e
        }), (0, D.jsx)(`p`, {
            children: t
        })]
    })
}

function uc(e) {
    let t = e.split(`/`)[0];
    return Us.find(e => e.id === t) ?.label || Hs.find(e => e.id === t) ?.name || Q.departments.find(e => `department:` + e.id === t) ?.name || Bs.find(e => e.id === t) ?.label || `business`
}

function dc() {
    let [e, t] = (0, i.useState)([]), [n, r] = (0, i.useState)(`guided`), [a, o] = (0, i.useState)(0), [s, c] = (0, i.useState)([]), [l, u] = (0, i.useState)(!1), [d, f] = (0, i.useState)([]), [p, m] = (0, i.useState)(0), [h, g] = (0, i.useState)(null), _ = Qs[a], v = s.at(-1) || ``, y = v.startsWith(`handoff:`) && h ? [...e.filter(e => ![`friction`, `future`, `process`].includes(e)), h === `current` ? `process` : h] : e, b = y.includes(`future`), x = (0, i.useCallback)(e => {
        let n = Math.max(0, Math.min(Qs.length - 1, e)),
            r = Qs[n];
        g(null), o(n), t(r.layers), c(r.focus ? [r.focus] : []), m(e => Math.max(e, n === 0 ? 0 : Math.min(8, n + 1)))
    }, []), S = (0, i.useCallback)(() => c(e => (e.length <= 1 && g(null), e.slice(0, -1))), []), C = (0, i.useCallback)(e => {
        f(t => t.includes(e) ? t : [...t, e]);
        let t = Bs.find(t => t.id === e);
        t && m(e => Math.max(e, Math.min(8, Bs.indexOf(t) + 1))), c(n => {
            if (n.at(-1) === e) return n;
            if (e.includes(`/`)) {
                let t = e.split(`/`)[0],
                    r = n.findIndex(e => e === t);
                return [...r >= 0 ? n.slice(0, r + 1) : [t], e]
            }
            if (n.includes(e)) return n.slice(0, n.indexOf(e) + 1);
            let r = Hs.find(t => t.id === e),
                i = Ws.find(t => t.id === e);
            return r || i || t ? [`department:` + (r ?.department || i ?.department || t ?.department), e] : [e]
        })
    }, []), w = e => {
        if (g(null), c([]), n === `guided`) {
            let t = Qs.findIndex(t => t.id === e);
            x(t >= 0 ? t : 0)
        } else t(t => t.includes(e) ? t.filter(t => t !== e) : [...t.filter(t => !(e === `future` && t === `friction`) && !(e === `friction` && t === `future`)).slice(-1), e])
    }, T = e => t(t => [...t.filter(e => e !== `future` && e !== `friction`), e ? `future` : `friction`].slice(-2)), E = () => {
        if (g(null), s.length) {
            c([]);
            return
        }
        n === `guided` ? x(0) : c([])
    };
    (0, i.useEffect)(() => {
        let e = e => {
            if (!e.target.closest(`input,textarea,[role=tablist]`) && !e.defaultPrevented)
                if (e.key === `Escape`) {
                    if (e.target.closest(`[role=dialog]`)) return;
                    e.preventDefault(), S()
                } else e.key === `Home` ? (e.preventDefault(), E()) : n === `guided` && (e.key === `ArrowRight` || e.key === `ArrowLeft`) && (e.preventDefault(), x(a + (e.key === `ArrowRight` ? 1 : -1)))
        };
        return window.addEventListener(`keydown`, e), () => window.removeEventListener(`keydown`, e)
    }, [n, a, x, S]);
    let ee = v.startsWith(`handoff:`) && h ? {
        eyebrow: h.toUpperCase() + ` / ` + uc(v).toUpperCase(),
        title: h === `future` ? `The same handover. The context moves with it.` : h === `friction` ? `Work waits when the context is missing.` : `A person carries the information between teams.`,
        caption: `Compare the handover, then return to the same business.`
    } : n === `guided` ? _ : {
        eyebrow: e.map(e => e.toUpperCase()).join(` + `) || `THE BUSINESS SKELETON`,
        title: e.length ? Ys[e.at(-1)].title : `One business. Every area connected.`,
        caption: e.length ? Ys[e.at(-1)].caption : `Select a layer to see what sits behind the customer experience.`
    };
    return (0, D.jsxs)(`div`, {
        className: `app`,
        children: [(0, D.jsxs)(`header`, {
            className: `masthead`,
            children: [(0, D.jsxs)(`button`, {
                className: `brand`,
                onClick: E,
                "aria-label": `Imbleo — return to business`,
                children: [`IMBLEO`, (0, D.jsx)(`span`, {
                    className: `brand-mark`
                })]
            }), (0, D.jsxs)(`span`, {
                className: `product-name`,
                children: [`Business Anatomy `, (0, D.jsx)(`span`, {
                    className: `version`,
                    children: `V1`
                })]
            }), (0, D.jsxs)(`button`, {
                className: `notes-toggle ` + (l ? `enabled` : ``),
                onClick: () => u(e => !e),
                "aria-pressed": l,
                "aria-label": `Toggle presenter notes`,
                children: [(0, D.jsx)(Is, {
                    size: 17
                }), (0, D.jsx)(`span`, {
                    children: `Presenter notes`
                })]
            }), (0, D.jsx)(hs, {
                value: n,
                onValueChange: n => {
                    r(n), c([]), n === `guided` ? x(a) : e.length || t([`customer`])
                },
                children: (0, D.jsxs)(_s, {
                    className: `mode-tabs`,
                    "aria-label": `Presentation mode`,
                    children: [(0, D.jsx)(vs, {
                        value: `guided`,
                        children: `Guided`
                    }), (0, D.jsx)(vs, {
                        value: `explore`,
                        children: `Explore`
                    })]
                })
            })]
        }), (0, D.jsxs)(`main`, {
            children: [(0, D.jsxs)(`section`, {
                className: `intro`,
                children: [(0, D.jsxs)(`div`, {
                    children: [(0, D.jsx)(`p`, {
                        className: `eyebrow`,
                        children: `ONE BUSINESS. ONE THREAD.`
                    }), (0, D.jsx)(`h1`, {
                        children: `See how your business really works.`
                    }), (0, D.jsx)(`p`, {
                        children: `One customer. Every person, process and system behind the experience.`
                    })]
                }), (0, D.jsxs)(`div`, {
                    className: `business-id`,
                    children: [(0, D.jsx)(`span`, {
                        className: `biz-initial`,
                        children: `H`
                    }), (0, D.jsxs)(`div`, {
                        children: [(0, D.jsx)(`b`, {
                            children: Q.name
                        }), (0, D.jsxs)(`small`, {
                            children: [Q.location, ` · Demonstration`]
                        })]
                    })]
                })]
            }), (0, D.jsxs)(`div`, {
                className: `workspace ` + (s.length ? `detail-open` : ``),
                children: [(0, D.jsx)(tc, {
                    active: y,
                    mode: n,
                    onChange: w
                }), (0, D.jsxs)(`section`, {
                    className: `map-panel`,
                    children: [(0, D.jsxs)(`div`, {
                        className: `map-toolbar`,
                        children: [(0, D.jsxs)(`div`, {
                            className: `breadcrumbs`,
                            children: [(0, D.jsx)(`button`, {
                                onClick: E,
                                children: `THE WHOLE BUSINESS`
                            }), (0, D.jsx)(`span`, {
                                className: `toolbar-divider`,
                                children: `/`
                            }), (0, D.jsx)(`span`, {
                                children: v ? uc(v) : e.length ? e.map(e => zs.find(t => t.id === e) ?.name).join(` + `) : `Business anatomy`
                            })]
                        }), (0, D.jsxs)(`div`, {
                            className: `map-tools`,
                            children: [n === `explore` && (e.includes(`friction`) || b) && (0, D.jsx)(hs, {
                                value: b ? `future` : `current`,
                                onValueChange: e => T(e === `future`),
                                children: (0, D.jsxs)(_s, {
                                    className: `compact-state`,
                                    children: [(0, D.jsx)(vs, {
                                        value: `current`,
                                        children: `Current`
                                    }), (0, D.jsx)(vs, {
                                        value: `future`,
                                        children: `Future`
                                    })]
                                })
                            }), (0, D.jsx)(`button`, {
                                "aria-label": `Return to whole business`,
                                onClick: E,
                                className: `icon-button`,
                                children: (0, D.jsx)(Fs, {
                                    size: 16
                                })
                            })]
                        })]
                    }), (0, D.jsx)(ec, {
                        active: y,
                        focus: v,
                        onSelect: C,
                        revealed: p,
                        visited: d
                    }), (0, D.jsxs)(`div`, {
                        className: `map-caption`,
                        children: [(0, D.jsxs)(`span`, {
                            children: [(0, D.jsx)(`i`, {
                                className: `legend-line ` + (y.includes(`friction`) ? `amber` : ``)
                            }), y.includes(`friction`) ? `Marked joins need attention` : b ? `Proposed repairs to the same joins` : e.includes(`people`) ? `People revealed · customer journey retained` : e.includes(`customer`) ? `Sarah’s journey · follow the numbered thread` : `The same business, underneath every layer`]
                        }), (0, D.jsxs)(`span`, {
                            children: [v ? `Esc steps back one level` : `Click an area or a journey point`, ` `, (0, D.jsx)(`span`, {
                                children: `↗`
                            })]
                        })]
                    })]
                })]
            }), (0, D.jsx)(ys, {
                className: `story-progress`,
                value: n === `guided` ? (a + 1) / Qs.length * 100 : 100,
                "aria-label": n === `guided` ? `Guided presentation progress` : `Explore mode`
            }), (0, D.jsxs)(`section`, {
                className: `story-bar`,
                children: [(0, D.jsxs)(`span`, {
                    className: `story-number`,
                    children: [n === `guided` ? String(a + 1).padStart(2, `0`) : `∞`, ` `, (0, D.jsx)(`small`, {
                        children: n === `guided` ? `/ 11` : ``
                    })]
                }), (0, D.jsxs)(`div`, {
                    "aria-live": `polite`,
                    children: [(0, D.jsx)(`p`, {
                        className: `eyebrow`,
                        children: ee.eyebrow
                    }), (0, D.jsx)(`h2`, {
                        children: ee.title
                    }), (0, D.jsx)(`p`, {
                        children: ee.caption
                    })]
                }), (0, D.jsx)(`div`, {
                    className: `story-actions`,
                    children: n === `guided` ? (0, D.jsxs)(D.Fragment, {
                        children: [(0, D.jsx)(`button`, {
                            className: `icon-button`,
                            "aria-label": `Previous frame`,
                            disabled: a === 0,
                            onClick: () => x(a - 1),
                            children: (0, D.jsx)(As, {
                                size: 18
                            })
                        }), (0, D.jsxs)(`button`, {
                            className: `primary`,
                            onClick: () => x(a === 10 ? 0 : a + 1),
                            children: [a === 10 ? `Start again` : `Next`, (0, D.jsx)(js, {
                                size: 17
                            })]
                        })]
                    }) : (0, D.jsxs)(`button`, {
                        className: `primary`,
                        onClick: () => {
                            r(`guided`), x(0)
                        },
                        children: [`Take the guided tour `, (0, D.jsx)(js, {
                            size: 17
                        })]
                    })
                })]
            }), l && (0, D.jsxs)(`aside`, {
                className: `presenter-notes`,
                children: [(0, D.jsx)(`p`, {
                    className: `eyebrow`,
                    children: `PRESENTER NOTES · VISIBLE WHILE THIS PANEL IS OPEN`
                }), (0, D.jsx)(`p`, {
                    children: _.note
                }), (0, D.jsx)(`button`, {
                    onClick: () => u(!1),
                    children: `Hide notes`
                })]
            }), (0, D.jsxs)(`footer`, {
                children: [(0, D.jsxs)(`span`, {
                    children: [`IMBLEO `, (0, D.jsx)(`span`, {
                        className: `footer-sep`,
                        children: `/`
                    }), ` Business Anatomy`]
                }), (0, D.jsxs)(`span`, {
                    children: [`← → Story `, (0, D.jsx)(`span`, {
                        className: `footer-sep`,
                        children: `·`
                    }), ` Esc Back `, (0, D.jsx)(`span`, {
                        className: `footer-sep`,
                        children: `·`
                    }), ` Home Whole business`]
                }), (0, D.jsx)(`span`, {
                    children: `Harbourline · Illustrative scenario`
                })]
            })]
        }), (0, D.jsx)(lc, {
            onNext: n === `guided` && a < 10 ? () => x(a + 1) : void 0,
            onPrevious: n === `guided` && a > 0 ? () => x(a - 1) : void 0,
            path: s,
            onBack: S,
            onSelect: C,
            future: b,
            comparison: h || (y.includes(`friction`) ? `friction` : b ? `future` : `current`),
            onComparison: g,
            onFuture: e => g(e ? `future` : `current`),
            revealed: p
        })]
    })
}
export {
    dc as
    default
};