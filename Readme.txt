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
	-TRANSAZIONI : Invio / Ricezione Bonifici Sepa
	-RICHIESTA DOCUMENTAZIONE : Possibilità di scaricare file di report PDF [ Estratto conto, spese mensili / in un intervallo di tempo definito ]
	-RICHIESTA PRESTITI: Possibilità di richiedere prestiti a cui aggiungere un tasso di interesse da restituire
	-RICHIESTA CARTE DI CREDITO/DEBITO : Possibilità di richiedere carte di pagamento
	-INVESTIMENTI : Possibilità di investire i fondi sul proprio conto in borsa
	-ACCESSO/MODIFICA INFOMAZIONI PERSONALI
	
I seguenti sono i moduli in cui si divide l'applicativo :
	-Welcome Page : Questa eè la prima pagina della banca, contiene
		-in alto, una navbar con il logo dell'azienda sulla sinistra, a sinistra con una sidebar due pulsanti per accedere alle sezioni di login e di registrazione
		-subito sotto un carosello con delle informazioni su ipotetiche campagne che sono al momento attive ( statiche )
		-sotto, vari flexbox con alcune informazioni della banca ( numero clienti, in quanti paesi opera , una serie di box con ipotetiche
		news relative alla banca stessa )
		-infine, un footer con informazioni ( eventuale piva, contatti, logo  )
	
	-Homepage Clienti: Una volta effettuato il login, si atterrerà sulla homepage clienti; qui sarà possibile visualizzare :
		-Il proprio codice iban
		-Il proprio saldo disponibile / contabile
		-Un elenco delle proprie operazioni ( entrate, uscite entro un range di 1 mese; volendo si può ampliare il filtro di ricerca della data )
		-Il totale delle entrate / uscite per questo mese ( solare , dal primo del mese ) 
		sarà da qui poi possibile usufruire di alcune sezioni per effettuare diverse operazioni :
			
			-Invio Bonifici : Questa sezione permette di effettuare un bonifico SEPA ad un altro iban; si seguiranno una serie di form che porteranno poi l'utente
			un riepilogo e una richiesta di conferma inserendo il suo pin personale . I bonifici sono contabilizzati ogni sera a mezzanotte da un batch, 
			che verifica i movimenti con il campo contabilizzato = false
			
			-Richiesta carte di credito, debito : possibilità di richiedere una nuova carta (credito, debito)
			
			-Investimenti : un pullsante permetterà di essere reindirizzata alla sezione Investimenti
				
			-Informazioni Personali : Da qui si potranno visualizzare/modificare le informazioni personali

	-Sezione Investimenti: Da qui si potranno effettuare nuovi investimenti, vedere il proprio P/L , la lista dei propri investimenti con delle card, le quali saranno cliccabili per vedere lo storico 				dell'investimento stesso ed eventualmente chiudere lo stesso
	
