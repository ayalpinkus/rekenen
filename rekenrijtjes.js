
function testWaarde(element,waarde)
{
  if (parseInt(element.value) == waarde)
  {
    element.style.color="#00ff00";
    element.disabled = true;

    var index=parseInt(element.id);
    index++;
    var nextElement=document.getElementById(""+index);
    if (nextElement)
    {
      nextElement.focus();
    }
    count++;
    if (count==nrSommen)
    {
      document.getElementById('next').style.display='block';
    }
    else
    {
      document.getElementById('next').style.display='none';
    }
  }
}
var nrSommen=7;
var count=0;

function nieuweOptelSommetjes()
{
  count=0;
  var van=parseInt(document.getElementById('van').value);
  var tot=parseInt(document.getElementById('tot').value);
  var sommetjes=document.getElementById('sommetjes');
  if (sommetjes != null)
  {
    var text="";
    var i;
    var ondernul = document.getElementById('ondernul').checked;


    for (i=0;i<nrSommen;i++)
    {
      var x=van+Math.floor(Math.random()*(tot-van));
      var y=0
      if (ondernul) {
        y=van+Math.floor(Math.random()*(tot-van));
      } else {
        y=van+Math.floor(Math.random()*(x));
      }
      var plus = (Math.random()>0.5);
      text=text+"<div style='display:table-row; '><div style='display:table-cell; padding-right:0.25in;' id='row'>" + x + (plus ? " + " : " - ") + y + " = </div><div style='display:table-cell;'><input style='margin-bottom:0.05in; font-size:24pt;' id='"+i+"' class='antwoord' type='text' oninput='testWaarde(this,"+(plus?(x+y):(x-y))+")'></div></div>";
    }
    sommetjes.innerHTML=text;

    var nextElement=document.getElementById("0");
    if (nextElement)
    {
      nextElement.focus();
    }
  }
}

function nieuweKeerSommetjes()
{
  count=0;
  var van=parseInt(document.getElementById('van').value);
  var tot=parseInt(document.getElementById('tot').value);
  var sommetjes=document.getElementById('sommetjes');
  if (sommetjes != null)
  {
    var text="";
    var i;
    for (i=0;i<nrSommen;i++)
    {
      var x=van+Math.floor(Math.random()*(tot-van));
      var y=van+Math.floor(Math.random()*(tot-van));
      var z=x*y;
      var mult = (Math.random()>0.5);

      text=text+"<div style='display:table-row; '><div style='display:table-cell; padding-right:0.25in;' id='row'>";
      if (mult)
      {
        text=text+x + " x " + y + " = </div><div style='display:table-cell;'><input style='margin-bottom:0.05in; font-size:24pt;' id='"+i+"' class='antwoord' type='text' oninput='testWaarde(this,"+z+")'><br>";
      }
      else
      {
        text=text+z + " &div; " + x + " = </div><div style='display:table-cell;'><input style='margin-bottom:0.05in; font-size:24pt;' id='"+i+"' class='antwoord' type='text' oninput='testWaarde(this,"+y+")'><br>";
      }
      text=text+"</div></div>";
    }
    sommetjes.innerHTML=text;

    var nextElement=document.getElementById("0");
    if (nextElement)
    {
      nextElement.focus();
    }
  }
}

