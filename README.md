# 🚀 Portfolio — Data Scientist & BI Developer

Site de portfólio pessoal com deploy automático no GitHub Pages.

## 📁 Estrutura do Projeto

```
portfolio/
├── index.html              # Página principal (single-page)
├── css/
│   └── style.css           # Todos os estilos
├── js/
│   └── main.js             # Interatividade, partículas, formulário
├── assets/                 # Imagens, favicon, etc (adicione aqui)
│   └── (seu-avatar.jpg)
├── .github/
│   └── workflows/
│       └── deploy.yml      # Deploy automático no GitHub Pages
└── README.md
```

## 🛠️ Como personalizar

### 1. Informações pessoais
Abra `index.html` e substitua:
- `Seu Nome` → seu nome real
- `SN` (logo) → suas iniciais
- Textos de bio, experiência e projetos
- Links do LinkedIn, GitHub e e-mail

### 2. Projetos
Edite os `<article class="project-card">` na seção `#projetos`.
Cada card tem:
- `project-card__type` → categoria
- `project-card__title` → nome do projeto
- `project-card__desc` → descrição
- `project-card__tech` → stack utilizada
- Links para GitHub e demo

### 3. Formulário de contato
O formulário está configurado com simulação. Para ativá-lo de verdade:

**Opção recomendada — Formspree (gratuito):**
1. Acesse [formspree.io](https://formspree.io) e crie uma conta
2. Crie um novo formulário e copie o ID (ex: `xyzabcde`)
3. Em `js/main.js`, descomente e edite:
```js
const response = await fetch('https://formspree.io/f/SEU_ID_AQUI', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message }),
});
```
4. Remova o `await new Promise(r => setTimeout(r, 1500))` acima

### 4. Favicon
Coloque um arquivo `favicon.ico` ou `favicon.png` na raiz e adicione no `<head>`:
```html
<link rel="icon" type="image/png" href="assets/favicon.png" />
```

---

## 🚀 Deploy no GitHub Pages

### Primeira vez (configuração)

1. **Crie um repositório no GitHub**
   - Vá em [github.com/new](https://github.com/new)
   - Nome: `portfolio` (ou `seunome.github.io` para URL personalizada)
   - Marque como **Public**
   - NÃO inicialize com README

2. **Suba os arquivos**
```bash
cd portfolio
git init
git add .
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/portfolio.git
git push -u origin main
```

3. **Ative o GitHub Pages**
   - No repositório → Settings → Pages
   - Source: **GitHub Actions**
   - O deploy roda automaticamente a cada push!

4. **Sua URL será:**
   - `https://SEU_USUARIO.github.io/portfolio/`
   - Ou `https://SEU_USUARIO.github.io/` se o repo se chamar `seunome.github.io`

### Atualizações futuras
```bash
git add .
git commit -m "update: descrição da mudança"
git push
```
O GitHub Actions faz o deploy automaticamente em ~1 minuto.

---

## 🌐 Domínio customizado (opcional)

1. Compre um domínio (ex: no [Registro.br](https://registro.br) ou Namecheap)
2. Crie um arquivo `CNAME` na raiz do projeto:
```
seunome.com.br
```
3. No seu provedor de DNS, aponte:
```
CNAME  www  SEU_USUARIO.github.io
A      @    185.199.108.153
A      @    185.199.109.153
A      @    185.199.110.153
A      @    185.199.111.153
```
4. No GitHub → Settings → Pages → Custom domain: `www.seunome.com.br`

---

## 🎨 Personalização de cores

Em `css/style.css`, na seção `:root`, altere as variáveis:
```css
--navy:  #0D1B2A;   /* fundo principal */
--cyan:  #00D4FF;   /* cor de destaque */
--off:   #F0F4F8;   /* fundo claro */
```

---

## 📊 Analytics (opcional)

Para acompanhar visitas, adicione antes de `</body>`:

**Google Analytics:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

Feito com ♥ — basta substituir os textos e fazer o push!
