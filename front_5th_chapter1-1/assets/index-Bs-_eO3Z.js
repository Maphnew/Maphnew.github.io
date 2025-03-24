(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const n={preferences:JSON.parse(localStorage.getItem("user"))||{},get(){return this.preferences},set({username:l,email:t="",bio:s=""}){this.preferences.username=l,this.preferences.email=t,this.preferences.bio=s,this.save()},save(){localStorage.clear(),localStorage.setItem("user",JSON.stringify(this.preferences))},clear(){localStorage.clear()}},a={loggedIn:!1,username:"",login(l){n.set({username:l}),this.loggedIn=!0,history.pushState({path:"/"},"","/")},logout(){this.loggedIn=!1,n.clear(),history.pushState({path:"/"},"","/")},getUser(){return n.get()},setUser(l={username:this.username,email:"",bio:""}){n.set(l)}},u=()=>`
        <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${a.loggedIn?`
              <li><a href="/" class="${location.pathname==="/"?"text-blue-600":"text-gray-600"}">홈</a></li>
              <li><a href="/profile" class="${location.pathname==="/profile"?"text-blue-600":"text-gray-600"}">프로필</a></li>
              <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
          `:`
              <li><a href="/" class="${location.pathname==="/"?"text-blue-600":"text-gray-600"}">홈</a></li>
              <li><a href="/profile" class="${location.pathname==="/profile"?"text-blue-600":"text-gray-600"}">프로필</a></li>
          `}
        </ul>
      </nav>
    `,m=()=>`
        <footer class="bg-gray-200 p-4 text-center">
            <p>&copy; 2024 항해플러스. All rights reserved.</p>
        </footer>
    `,p=()=>`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${u()}
      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">

          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">홍길동</p>
                <p class="text-sm text-gray-500">5분 전</p>
              </div>
            </div>
            <p>오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">김철수</p>
                <p class="text-sm text-gray-500">15분 전</p>
              </div>
            </div>
            <p>새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">이영희</p>
                <p class="text-sm text-gray-500">30분 전</p>
              </div>
            </div>
            <p>오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">박민수</p>
                <p class="text-sm text-gray-500">1시간 전</p>
              </div>
            </div>
            <p>주말에 등산 가실 분 계신가요? 함께 가요!</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">정수연</p>
                <p class="text-sm text-gray-500">2시간 전</p>
              </div>
            </div>
            <p>새로 나온 영화 재미있대요. 같이 보러 갈 사람?</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>
        </div>
      </main>

    ${m()}
    </div>
  </div>
`,b=()=>`
<main class="bg-gray-100 flex items-center justify-center min-h-screen">
  <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
    <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
    <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
    <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
    <p class="text-gray-600 mb-8">
      요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
    </p>
    <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
      홈으로 돌아가기
    </a>
  </div>
</main>
`,c=()=>`
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6">
      <div class="text-center">
        <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
      </div>
    </div>
  </main>
`,f=()=>{const{username:l,email:t,bio:s}=a.getUser();return`
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${u()}

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form">
              <div class="mb-4">
                <label
                  for="username"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >사용자 이름</label
                >
                <input
                  type="text"
                  id="username"
                  name="username"
                  value="${l}"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >이메일</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value="${t}"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-6">
                <label
                  for="bio"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >자기소개</label
                >
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  class="w-full p-2 border rounded"
                >${s}</textarea>
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>

        ${m()}
      </div>
    </div>
`},g=()=>{switch(location.pathname){case"/":return p();case"/login":return c();case"/profile":return a.loggedIn?f():(history.pushState({path:"/login"},"","/login"),c());default:return b()}},h=()=>{document.querySelector("#root").innerHTML=g()},i=()=>{if(h(),location.pathname==="/profile"&&document.getElementById("profile-form").addEventListener("submit",s=>{s.preventDefault();const r={username:document.getElementById("username").value,email:document.getElementById("email").value,bio:document.getElementById("bio").value};a.setUser(r)}),location.pathname==="/login"){const t=document.getElementById("login-form");t.addEventListener("submit",s=>{s.preventDefault();const r=t.querySelector('input[type="text"]').value;if(!r){alert("사용자 이름을 입력해주세요.");return}a.login(r),i()})}const l=document.getElementById("logout");l&&l.addEventListener("click",()=>{a.logout()}),document.querySelectorAll("a").forEach(t=>{t.addEventListener("click",s=>{s.preventDefault();const r=s.target.href.replace(location.origin,"");history.pushState({path:r},"",r),i()})})};window.addEventListener("popstate",()=>{i()});i();
