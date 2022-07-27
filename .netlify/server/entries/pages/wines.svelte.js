var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Wines,
  prerender: () => prerender
});
module.exports = __toCommonJS(stdin_exports);
var import_index_511472e1 = require("../../_app/immutable/chunks/index-511472e1.js");
const WINE_LIST = [
  {
    name: "Strass GV",
    bottle: "4.8"
  },
  {
    name: "Strass R",
    bottle: "7.15"
  },
  {
    name: "Strass Hasel GV",
    bottle: "5.61"
  },
  {
    name: "Strass Wechselberg GV",
    bottle: "7.81"
  },
  {
    name: "Strass Stangl RV",
    bottle: "8.69"
  },
  {
    name: "Strasser Rosengartl RV",
    bottle: "14.85"
  },
  {
    name: "Strass Gaisberg CH",
    bottle: "8.69"
  },
  {
    name: "Strasser Gaisberg GV",
    bottle: "11.88"
  },
  {
    name: "Strasser Kammerner Lamm GV",
    bottle: "16.72"
  },
  {
    name: "Z\xF6binger Gaisberg R",
    bottle: "13.75"
  },
  {
    name: "Z\xF6binger Heilingenstein R",
    bottle: "17.82"
  }
];
const wines_svelte_svelte_type_style_lang = "";
const css = {
  code: ".win_name.svelte-1o7hstn.svelte-1o7hstn{text-align:start}.win_prize.svelte-1o7hstn.svelte-1o7hstn{text-align:end;width:5em}.win_prize.-bottle.svelte-1o7hstn.svelte-1o7hstn{padding-right:1rem}.win_total.svelte-1o7hstn.svelte-1o7hstn{font-weight:bold;font-size:var(--font-size-large);color:var(--color-accent);position:relative}.win_total.svelte-1o7hstn span.svelte-1o7hstn{position:absolute;left:100%;top:0;bottom:0;display:flex;align-items:center;color:var(--color-text)}.win_boxes.svelte-1o7hstn.svelte-1o7hstn{display:flex;align-items:center;justify-content:center}.win_boxes.svelte-1o7hstn input.svelte-1o7hstn{width:3rem;margin:0}.frm_submit.svelte-1o7hstn.svelte-1o7hstn{margin:4rem auto 0;display:block}.frm_step.svelte-1o7hstn.svelte-1o7hstn{width:calc(100% - 34rem);position:absolute;left:100%;opacity:0;transition:opacity 0.05s, left 0.3s;padding:4rem}.frm_step.-visible.svelte-1o7hstn.svelte-1o7hstn{opacity:1;left:0;transition:opacity 0.5s, left 0.3s}.frm_back.svelte-1o7hstn.svelte-1o7hstn{margin-top:2rem}.pge_name.svelte-1o7hstn.svelte-1o7hstn{margin:0 auto;text-align:center}.pge_cart.svelte-1o7hstn.svelte-1o7hstn{position:fixed;top:0;right:0;padding:4rem;margin:4rem;background-color:#fff;border-radius:1rem;width:30rem;z-index:9}",
  map: null
};
const prerender = true;
const shippingPerBottle = 0.5;
const bottlesPerBox = 6;
const maxBoxes = 30;
const Wines = (0, import_index_511472e1.c)(($$result, $$props, $$bindings, slots) => {
  let netto;
  let bottles;
  let shipping;
  let wines = WINE_LIST;
  let name;
  let email;
  let emailValid;
  let nameValid;
  let { total } = $$props;
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  $$result.css.add(css);
  netto = wines.reduce(
    (sum, current) => {
      current.boxes = current.boxes || 0;
      current.prize = current.bottle * current.boxes * bottlesPerBox || 0;
      return sum + current.prize;
    },
    0
  );
  bottles = wines.reduce(
    (sum, current) => {
      current.bottles = current.boxes * bottlesPerBox;
      return sum + current.bottles;
    },
    0
  );
  shipping = shippingPerBottle * bottles;
  total = shipping + netto;
  return `${$$result.head += `${$$result.title = `<title>Cenik</title>`, ""}<meta name="${"description"}" content="${"Cenik vin"}" data-svelte="svelte-18m0dow">`, ""}

<form name="${"order"}" method="${"post"}" data-netlify="${"true"}" data-netlify-recaptcha="${"true"}" class="${"frm"}"><input type="${"hidden"}" name="${"form-name"}" value="${"order"}">

	<input type="${"hidden"}" name="${"total"}"${(0, import_index_511472e1.a)("value", total, 0)}>

	<div class="${"pge_cart svelte-1o7hstn"}"><table class="${"table"}"><tr><td class="${"win_name svelte-1o7hstn"}">Netto</td>
				<td colspan="${"3"}" class="${"win_prize svelte-1o7hstn"}">${(0, import_index_511472e1.e)(netto ? (Math.round((netto + Number.EPSILON) * 100) / 100).toFixed(2) : 0)}</td></tr>
			<tr><td class="${"win_name svelte-1o7hstn"}">Doprava</td>
				<td colspan="${"3"}" class="${"win_prize svelte-1o7hstn"}">${(0, import_index_511472e1.e)(shipping ? shipping.toFixed(2) : 0)}</td></tr>
			<tr><td class="${"win_name svelte-1o7hstn"}">Total</td>
				<td colspan="${"3"}" class="${"win_prize win_total svelte-1o7hstn"}">${(0, import_index_511472e1.e)(total ? total.toFixed(2) : 0)}
					<span class="${"svelte-1o7hstn"}">\u20AC</span></td></tr></table></div>

	<div class="${["frm_step svelte-1o7hstn", "-visible"].join(" ").trim()}"><div class="${"page pge_order"}"><div><table class="${"table"}"><tr><th class="${"win_name svelte-1o7hstn"}">V\xEDno</th>
						<th class="${"win_prize -bottle svelte-1o7hstn"}">Lahev</th>
						<th>Krabic (x6)</th>
						<th class="${"win_prize svelte-1o7hstn"}">\u20AC</th></tr>
					${(0, import_index_511472e1.b)(wines, ({ name: name2, bottle, boxes, prize }) => {
    return `<tr><td class="${"win_name svelte-1o7hstn"}">${(0, import_index_511472e1.e)(name2)}</td>
							<td class="${"win_prize -bottle svelte-1o7hstn"}">${(0, import_index_511472e1.e)(bottle)}</td>
							<td><div class="${"win_boxes svelte-1o7hstn"}"><button class="${"button -small -left"}" type="${"button"}" ${boxes < 1 ? "disabled" : ""}>-</button>
									<input type="${"number"}" min="${"0"}" max="${"10"}" maxlength="${"2"}" class="${"input svelte-1o7hstn"}"${(0, import_index_511472e1.a)("name", name2, 0)} readonly${(0, import_index_511472e1.a)("value", boxes, 0)}>
									<button class="${"button -small -right"}" type="${"button"}" ${bottles / bottlesPerBox >= maxBoxes ? "disabled" : ""}>+</button>
								</div></td>
							<td class="${"win_prize svelte-1o7hstn"}">${(0, import_index_511472e1.e)(prize ? prize.toFixed(2) : 0)}</td>
						</tr>`;
  })}</table>

				<button type="${"button"}" ${bottles < 1 ? "disabled" : ""} class="${"button -submit frm_submit svelte-1o7hstn"}">Dalsi</button></div></div></div>

	<div class="${["frm_step svelte-1o7hstn", ""].join(" ").trim()}"><div class="${"page pge_name svelte-1o7hstn"}"><input name="${"name"}" class="${["input", ""].join(" ").trim()}" placeholder="${"Jmeno"}"${(0, import_index_511472e1.a)("value", name, 0)}>

			<input name="${"email"}" type="${"email"}" class="${["input", ""].join(" ").trim()}" placeholder="${"E-mail"}"${(0, import_index_511472e1.a)("value", email, 0)}>

			<button type="${"button"}" ${"disabled"} class="${"button -submit frm_submit svelte-1o7hstn"}">Dalsi</button>
			<button type="${"button"}" class="${"a -secondary frm_back svelte-1o7hstn"}">Ne, posral sem to</button></div></div>

	<div class="${["frm_step svelte-1o7hstn", ""].join(" ").trim()}"><div class="${"page"}"><p>Chystas se objednat <strong>${(0, import_index_511472e1.e)(bottles / bottlesPerBox)}</strong> krabic (tj. ${(0, import_index_511472e1.e)(bottles)} lahvi)<br>
				za <strong>${(0, import_index_511472e1.e)(total.toFixed(2))}\u20AC</strong>. Souhlas?
			</p>

			<table class="${"table"}"><tr><th class="${"win_name svelte-1o7hstn"}">V\xEDno</th>
					<th class="${"win_prize svelte-1o7hstn"}">Krabic</th></tr>
				${(0, import_index_511472e1.b)(wines, ({ name: name2, bottle, boxes, prize }) => {
    return `${boxes > 0 ? `<tr><td class="${"win_name svelte-1o7hstn"}">${(0, import_index_511472e1.e)(name2)}</td>
							<td class="${"win_prize svelte-1o7hstn"}">${(0, import_index_511472e1.e)(boxes)}</td>
						</tr>` : ``}`;
  })}</table>

			<div data-netlify-recaptcha="${"true"}"></div>

			<button type="${"submit"}" ${bottles < 1 || !nameValid || !emailValid ? "disabled" : ""} class="${"button -submit frm_submit svelte-1o7hstn"}">Objednat</button>
			<button type="${"button"}" class="${"a -secondary frm_back svelte-1o7hstn"}">Ne, posral sem to</button></div></div>

</form>`;
});
