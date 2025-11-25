# Como fazer Deploy no Firebase Hosting

Este projeto foi configurado com Next.js. Para hospedar no Firebase Hosting (plano gratuito), siga os passos abaixo:

## Pré-requisitos
1. Certifique-se de ter o Node.js instalado.
2. Crie um projeto no [Console do Firebase](https://console.firebase.google.com/).

## Passo a Passo

1. **Instale as ferramentas do Firebase (se ainda não tiver):**
   ```bash
   npm install -g firebase-tools
   ```

2. **Faça login no Firebase:**
   ```bash
   firebase login
   ```

3. **Inicialize o Firebase no projeto:**
   Execute este comando na pasta `portfolio`:
   ```bash
   firebase init hosting
   ```

   - **Are you ready to proceed?** -> `Yes`
   - **Please select an option:** -> `Use an existing project` (selecione o projeto que você criou no console)
   - **Detected an existing Next.js codebase in the current directory, should we use it?** -> `Yes`
   - **In which region would you like to host your server-side content?** -> `us-central1` (ou a de sua preferência)
   - **Set up automatic builds and deploys with GitHub?** -> `No` (ou `Yes` se quiser configurar CI/CD)

4. **Faça o Deploy:**
   ```bash
   firebase deploy
   ```

O Firebase detectará automaticamente que é um projeto Next.js e configurará tudo para você.

## Testando Localmente
Para testar a versão de produção localmente antes de enviar:
```bash
npm run build
firebase serve
```
