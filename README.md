# one time url shortener
This nodejs application can short your link and  adds some security featuers:

1)Preview protection - app checks referer header and if it is not presented, responses with 503 error (simple protection against bots)

2)Destroy after n clicks - link will be unavailable after n successful clicks

3)Return error before n clicks are made - link will be unavailable before n successful clicks, then it will be available for n clicks  in second option 

Example: https://shrt.qwertyforce.ru/
