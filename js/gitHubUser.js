export class GithubUser {
    static search(username) {
        const endpoint = `https://api.github.com/users/${username}`
        return fetch(endpoint)
//  data é o endpoint, endpoint é os dados do usúario que veio pela api do gitHub
        .then( data => data.json())
//  desestrutura o data para pegar apenas oque quer dele.
        .then( ({login, name, public_repos, followers}) => (
        {
            login,
            name,
            public_repos,
            followers,
        }))
    }
}