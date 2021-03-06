# Teste - Front-End
O desafio é realizar o desenvolvimento front-end da homepage de um jornal fictício. O desenvolvimento deve seguir fielmente o layout disponibilizado nos arquivos abaixo (espaçamento, cores, tipografia e etc). Você não deve utilizar nenhum framework CSS (Bootstrap, Foundation e etc) neste desafio.

## Instruções - Topo
* O submenu deve ser ativado no hover
* Os links do submenu não precisam ser verídicos

## Instruções - Slide
* Não pode ser utilizado nenhum plugin Jquery. Você pode, entretanto, usar o Jquery para manipular os elementos
* O nome das imagens, bem como a ordem delas, encontra-se no JSON [slide](Arquivos/JSON/slide.json)

## Instruções - Editorias
* A lista de editorias deve ser gerada a partir do JSON [notícias](Arquivos/JSON/noticias.json)
* As notícias devem ser exibidas de acordo com a editoria que está selecionada no selectbox, se nenhuma editoria estiver selecionada, todas as notícias precisam aparecer
* Deverá ser possível ordenar as notícias por data de publicacão (da mais recente para a mais antiga) ou por ordem alfabética
* As notícias dessa sessão devem vir do arquivo JSON chamado [notícias](Arquivos/JSON/noticias.json)
* O conteúdo da notícia também deve ser gerado dinamicamente (data, editoria, foto, título e texto)

## Instruções - Gráfico
* Fique à vontade para usar a ferramenta que preferir para gerar o gráfico. A única exigência é que ele seja gerado dinamicamente

## Instruções - Mapa
* O mapa deve ser gerado usando a API do Google Maps
* O pin/mark do mapa deve ser inserido via API do Google Maps

## Arquivos
- Layout [aqui](Arquivos/Layout)
- Imagens [aqui](Arquivos/Imagens)
- JSONS [aqui](Arquivos/JSON)

## Implementações
- Site responsivo

## Configurações
- Altere a string "YOUR_API_KEY" para a sua chave da API Google no arquivo [index.html](index.html)
- Caso queira trocar o endereço do mapa, altere a variável address [aqui](assets/js/map.js)
- As configurações de cores utilizadas no site estão no arquivo [variables.less](assets/less/variables.less). Basta alterar e compilar o less novamente.