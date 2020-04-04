$(document).ready(function(){

var grid = [0,0,0,0,0,0,0,0,0];
var players = ["Cross","Circle"];
var tnum = 0;
var dict = {"aa":0 ,"bb":1,"cc":2,"dd":3,"ee":4,"ff":5,"gg":6,"hh":7,"ii":8};
var winner = 0;
$("td.data").click(function(){
	if(winner==1)
		return;
	$("div em")[0].textContent="";
	var pos = this.id;
	var value = grid[dict[pos]];
	if(value==0)
	{	
		var played = tnum;
		$(".warning")[0].textContent = "";
		tnum = tnum+1;
		tnum = tnum%2;
		if(tnum==1)
		{
			this.style.backgroundImage="url('cross.png')";
			grid[dict[pos]] = 1;
		}
		if(tnum==0)
		{
			this.style.backgroundImage="url('circle.png')";
			grid[dict[pos]] = 2;
		}
		checkwinner(played);
	}
	else
	{
		$(".warning")[0].textContent = "Box Occupied. Try something else";
	}
})

function checkwinner(t){
	var v = t+1
	if((grid[0]==v&&grid[3]==v&&grid[6]==v)||(grid[1]==v&&grid[4]==v&&grid[7]==v)||(grid[2]==v&&grid[5]==v&&grid[8]==v)||(grid[0]==v&&grid[1]==v&&grid[2]==v)||(grid[3]==v&&grid[4]==v&&grid[5]==v)||(grid[6]==v&&grid[7]==v&&grid[8]==v)||(grid[0]==v&&grid[4]==v&&grid[8]==v)||(grid[2]==v&&grid[4]==v&&grid[6]==v))
	{
		winner = 1;
		$("div em")[0].textContent="Game ended";
		$("div.box strong")[0].textContent = players[t]+" wins. Reload to start a new game";
	}
	else
	{
		$("div.box strong")[0].textContent = players[tnum]+" plays now!";
	}
}
$(".reload").click(function(){
	location.reload(true);
})
})
