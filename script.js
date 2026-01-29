const questions = [
/* ===== KOSA KATA (30) ===== */
['あさごはん の いみ',['sarapan','makan malam','minum'],0],
['ひるごはん の いみ',['makan siang','sarapan','makan malam'],0],
['ばんごはん の いみ',['makan malam','sarapan','makan siang'],0],
['がっこう の いみ',['sekolah','rumah','kantor'],0],
['こうえん の いみ',['taman','stasiun','rumah sakit'],0],
['えき の いみ',['stasiun','bandara','terminal'],0],
['へや の いみ',['kamar','dapur','kantor'],0],
['せんせい の いみ',['guru','murid','dokter'],0],
['がくせい の いみ',['mahasiswa','guru','pegawai'],0],
['かいしゃいん の いみ',['karyawan','direktur','guru'],0],
['いしゃ の いみ',['dokter','perawat','guru'],0],
['でんわ の いみ',['telepon','radio','tv'],0],
['みず の いみ',['air','teh','kopi'],0],
['ごはん の いみ',['nasi','roti','mie'],0],
['ナシゴレン の いみ',['nasi goreng','mie goreng','sup'],0],

/* ===== PARTIKEL (25) ===== */
['まいにち がっこう（ ）いきます',['に','で','を'],0],
['へや（ ）べんきょうします',['で','に','を'],0],
['みず（ ）のみます',['を','に','で'],0],
['がっこう（ ）いきます',['へ','を','で'],0],
['7じ（ ）おきます',['に','で','を'],0],
['9じ（ ）ねます',['に','で','を'],0],
['ともだち（ ）あいます',['に','を','で'],0],
['にほん（ ）いきます',['へ','を','で'],0],
['こうえん（ ）あそびます',['で','に','を'],0],
['えき（ ）いきます',['へ','を','で'],0],
['パン（ ）たべます',['を','に','で'],0],
['ジュース（ ）のみます',['を','で','に'],0],
['へや（ ）います',['に','で','を'],0],
['がっこう（ ）べんきょうします',['で','に','を'],0],
['7じ から 9じ（ ）べんきょうします',['まで','に','で'],0],
['きょう（ ）なにをします',['は','を','に'],0],
['わたし（ ）がくせいです',['は','を','に'],0],
['きのう（ ）なにもたべませんでした',['は','を','に'],0],
['ともだち（ ）でんわします',['に','を','で'],0],
['がっこう（ ）ともだちにあいました',['で','に','を'],0],

/* ===== CAMPURAN (5) ===== */
['ただしい ぶん は どれ',['わたしは 7じ に おきます','わたしは 7じ を おきます','わたしは 7じ で おきます'],0],
['ただしい ぶん は どれ',['こうえんで あそびます','こうえんに あそびます','こうえんを あそびます'],0],
['ただしい ぶん は どれ',['みずを のみます','みずに のみます','みずで のみます'],0],
['ただしい ぶん は どれ',['がっこうへ いきます','がっこうを いきます','がっこうで いきます'],0],
['ただしい ぶん は どれ',['きのう ナシゴレンを たべました','きのうに ナシゴレンを たべました','きのう ナシゴレンに たべました'],0],
];

function shuffle(a){return a.sort(()=>Math.random()-0.5)}
const quiz = shuffle(questions);

const form = document.getElementById('quiz');
quiz.forEach((q,i)=>{
  const div=document.createElement('div');
  div.className='question';
  div.innerHTML=`<p>${i+1}. ${q[0]}</p>`+
  shuffle([...q[1]]).map(o=>`
    <label>
      <input type="radio" name="q${i}" value="${o}"> ${o}
    </label>`).join('');
  form.appendChild(div);
});

function check(){
  let score=0;
  const wrongCount={};
  quiz.forEach((q,i)=>{
    const sel=document.querySelector(`input[name=q${i}]:checked`);
    const inputs=document.querySelectorAll(`input[name=q${i}]`);
    inputs.forEach(inp=>{
      if(inp.value===q[1][q[2]]) inp.parentElement.classList.add('correct');
      if(sel && inp===sel && inp.value!==q[1][q[2]]){
        inp.parentElement.classList.add('wrong');
        wrongCount[q[0]]=(wrongCount[q[0]]||0)+1;
      }
    });
    if(sel && sel.value===q[1][q[2]]) score++;
  });

  document.getElementById('result').innerHTML=
    `Benar: ${score} / ${quiz.length}<br>Nilai: ${Math.round(score/quiz.length*100)}`;

  let analysis='<h3>Soal yang sering salah:</h3>';
  for(let k in wrongCount){analysis+=`・${k}<br>`}
  document.getElementById('analysis').innerHTML=analysis;
}

function goFull(){
  document.documentElement.requestFullscreen();
}
