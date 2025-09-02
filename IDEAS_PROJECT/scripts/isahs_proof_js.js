console.log("Gotca");
function generate() {
  const n = parseInt(document.getElementById("n").value);
  if (!n || n < 3 || n > 10) {
    alert("Please select a value of n between 3 and 10.");
    return;
  }

  const A = Array.from({ length: n }, (_, i) => `A_{${i + 1}}`);
  const matrix = Array.from({ length: n }, () => Array(n).fill("0"));
  const v = Array.from({ length: n }, () => []);
  const y = {};
  const pairwiseGCDs = [], vDefs = [], scaledExprs = [];

  let output = "";

  output += `<h3>Bézout Identity to Prove</h3>`;
  output += `$$${A.map((a, i) => `${a} v_{${i + 1}}`).join(" + ")} = d$$`;
  output += `<p>where $d = \\gcd(${A.join(", ")})$</p>`;

  output += `<h3>Definition: Palestine 2-Combinations ($\\mathcal{P}_2C$ )</h3>`;
  output += `<p>Given $A_k \\in \\mathcal{Z}$ where $k=1,2,\\dots,n$ a $\\mathcal{P}_2C$ is the set <br /> $\\mathcal{P}=\\{(A_i,A_j)|1 \\leq i < j \\leq n \\}$ <br /> with following properties: <ul> <li> For any $i$ and $j$ with $i < j$ the pair $(A_i,A_j)$ is an elememt in $\\mathcal{P}$ even if $A_i = A_j$ i.e positional distinction is maintained. </li> <li> The pairs $(A_i,A_j)$ and $(A_j,A_i)$ count as one i.e order does not matter. </li></ul> </p>`;

  output += `<h3>Definition: Pairwise GCDs</h3>`;
  output += `<p> The multiset $\\mathcal{D} = \\{g_{ij}|1 \\leq i < j \\leq n \\}$ drawn from $\\mathcal{P}$ with $g_{ij}=\\gcd(A_i,A_j)$ is referred to as Pairwise GCDs.</p>`;

  output += `<h3>Proof</h3>`;
  output += `<p>Let $g = \\gcd(\\{g_{ij}\\})$.</p>`;
  output += `<p>From theorem 1 each $g_{ij} \\in \\mathcal{D}$ can be expressed thus: <br /> $g_{ij} = A_{i}x_{ij}+A_jx_{ji}$.</p>`;

  output += `<h3>Isah's Form</h3>`;
  output += `<p>Construct the symbolic form: $g = \\sum g_{ij} y_{ij}$ where $y_{ij}$ are called Palestine coefficients.</p>`;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const g = `g_{${i + 1}${j + 1}}`;
      const xij = `x_{${i + 1}${j + 1}}`;
      const xji = `x_{${j + 1}${i + 1}}`;
      const yij = `y_{${i + 1}${j + 1}}`;
      const vij = `v_{${i + 1}${j + 1}}`;
      const vji = `v_{${j + 1}${i + 1}}`;

      y[`${i}${j}`] = yij;

      pairwiseGCDs.push(`$${A[i]} ${xij} + ${A[j]} ${xji} = ${g}$`);
      vDefs.push(`$${vij} = ${xij}${yij},\\quad ${vji} = ${xji}${yij}$`);
      scaledExprs.push(`$${A[i]} ${vij} + ${A[j]} ${vji}$`);

      matrix[i][j] = vij;
      matrix[j][i] = vji;

      v[i].push(vij);
      v[j].push(vji);
    }
  }

  const isah = Object.entries(y)
    .map(([k, val]) => `g_{${+k[0] + 1}${+k[1] + 1}} ${val}`)
    .join(" + ");

  output += `<p>So we have:</p>`;
  output += `$$${isah} = g$$`;
  output += `<p><strong>Claim:</strong> $g = d$ (see <a href="#claim">Claim</a>)</p>`;
  output += `$$${isah} = d$$`;

  let genSc = `<p>$\\sum_{i<j}^{${n}} g_{ij}y_{ij} = \\sum_{i<j}^{${n}} (A_ix_{ij}+A_jx_{ji})y_{ij}$ 
  </p>`;

  output += `<h3>Scaled Bézout Coefficients</h3>${genSc}<ul>` + vDefs.map(e => `<li>${e}</li>`).join("") + `</ul>`;

  let eqnSc = `<p>$\\sum_{i<j}^{${n}} g_{ij}y_{ij} = \\sum_{i<j}^{${n}} (A_iv_{ij}+A_jv_{ji})$</p>`;

  output += `<h3>Scaled Equations</h3>${eqnSc}<ul>` + scaledExprs.map(e => `<li>${e}</li>`).join("") + `</ul>`;
  let k = '3';
  if (n > 3) {
    k = `...,${n}`;
  }
  output += `Collecting terms with coefficients $A_k$ where $k=1,2,${k}$`;
  output += `$$${A.map((a, i) => `${a} (${v[i].join(" + ")})`).join(" + ")} = d$$`;

  let mtxPop = `<p>Using matrix to organize $v_{ij}$ and $v_{ji}$ provide a structured way to express the resultant equation. <br /> $M$ is populated as follows: <br />  $\\begin{cases} m{i,j} & :=v_{ij} if i < j$ (upper triangle) \\\  m_{j,i} & := v_{ji} if i<j (\\text{lower triangle}) \\\ m_{i,i} & := 0 (\\text{main diagonal}) \\end{cases} </p>`;

  output += `<h3>Matrix M ($m_{i,j}$)</h3>${mtxPop}<table><tbody>`;
  for (let i = 0; i < n; i++) {
    output += `<tr>`;
    for (let j = 0; j < n; j++) {
      output += `<td>$${matrix[i][j]}$</td>`;
    }
    output += `</tr>`;
  }
  output += `</tbody></table>`;

  output += `<h3>Each $v_i$ from Row Summation</h3><ul>`;
  for (let i = 0; i < n; i++) {
    output += `<li>$v_{${i + 1}} = ${v[i].join(" + ")}$</li>`;
  }
  output += `</ul>`;

  output += `<h3>Final Bézout Expression</h3>`;
  output += `$$${A.map((a, i) => `${a} (${v[i].join(" + ")})`).join(" + ")} = d$$`;

  output += `<p><strong>$\\checkmark$ Identity Proved Symbolically.</strong><br> Each $v_i$ is built from scaled Bézout coefficients using the Palestine coefficients $y_{ij}$.<br> Hence, $A_1 v_1 + A_2 v_2 + \\ldots + A_n v_n = d$, where $d = \\gcd(A_1, A_2, \\ldots, A_n)$.</p>`;

  output += `<h3 id="claim">Justification of Claim: $g = d$</h3>`;
  output += `<p>Since each $g_{ij}$ divides both $A_i$ and $A_j$, the GCD of all $g_{ij}$ divides the GCD of $\\{A_1, A_2, \\dots, A_n\\}$. That is, $g \\mid d$.</p>`;
  output += `<p>Moreover, the construction of the Palestine coefficients $y_{ij}$ ensures that the linear combination $\\sum g_{ij} y_{ij} = g$ equals $d$ symbolically. Hence, $g = d$.</p>`;

  document.getElementById("output").innerHTML = output;
  if (window.MathJax) {
    MathJax.typeset();
  }
}