Progetto : Banca Online ( StarBank )

Architettura : Rest

Linguaggi:
	FE : Html, Css, Typescript
	BE : Java
	
Framework:
	FE : Angular 20
	BE : Spring Boot 3

Database:
	SQL : Postgresql
	
Descrizione : Il progetto StarBank si pone come obbiettivo quello di riprodurre alcuni casi d'uso
di una ideologica banca online :
	-ACCESSO : Securizzato tramite jwt
	-TRANSAZIONI : Invio / Ricezione Bonifici Sepa, Effettuare pagamenti online
	-RICHIESTA DOCUMENTAZIONE : Possibilità di scaricare file di report PDF [ Estratto conto, spese mensili / in un intervallo di tempo definito ]
	-RICHIESTA PRESTITI/MUTUI : Possibilità di richiedere prestiti a cui aggiungere un tasso di interesse da restituire
	-RICHIESTA CARTE DI CREDITO/DEBITO : Possibilità di richiedere carte di pagamento
	-INVESTIMENTI : Possibilità di investire i fondi sul proprio conto in borsa
	-ACCESSO/MODIFICA INFOMAZIONI PERSONALI
	
I seguenti sono i moduli in cui si divide l'applicativo :
	-Welcome Page : Questa eè la prima pagina della banca, contiene
		-in alto, una navbar con il logo dell'azienda sulla sinistra, a destra il bottone di login, bottone apri un conto
		-subito sotto un carosello con delle informazioni su ipotetiche campagne che sono al momento attive ( statiche )
		-sotto, vari flexbox con alcune informazioni della banca ( numero clienti, in quanti paesi opera , una serie di box con ipotetiche
		news relative alla banca stessa )
		-infine, un footer con informazioni ( eventuale piva, contatti, logo  )
	
	-Homepage Clienti: Una volta effettuato il login, si atterrerà sulla homepage clienti; qui sarà possibile visualizzare :
		-Il proprio codice iban
		-Il proprio saldo disponibile / contabile
		-Un elenco delle proprie operazioni ( entrate, uscite entro un range di 1 mese; volendo si può ampliare il filtro di ricerca della data )
		-Il totale delle entrate / uscite per questo mese ( solare , dal primo del mese ) 
		sarà da qui poi possibile accedere in altre sezioni
			
			-Invio Bonifici : Questa sezione permette di effettuare un bonifico SEPA ad un altro iban; si seguiranno una serie di form che porteranno poi l'utente
			un riepilogo e una richiesta di conferma inserendo il suo pin personale
			
			-Richiesta carte di credito, debito : Da questa sezione si vedrà in alto le carte attualmente disponibili, le quali saranno selezionabili
			per poter visualizzare i movimenti delle stesse al di sotto; inoltre, sarà possibile richiedere una nuova carta (credito, debito)
			
			-Investimenti : in questa sezione sarà possibile vedere i propri investimenti, con relativo guadagno / perdita
			
			-Documentazione : Da qui si accederà alla sezione per poter richiedere documenti scaricabili come file pdf; i documenti saranno generabili per
				-Estratto conto Carta di credito ( richiedibile se si possiede carta di credito )
				-Estrazione Movimenti negli ultimi x giorni ( impostabili di defaut da una dropdown o dall'utente, fino ad un max di 90 giorni )
				
			-Informazioni Personali : Da qui si potranno visualizzare/modificare le informazioni personali
	
