using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class baitap81 : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }
    public class Dongvat 
    {
        public string Ten;
        public string Moitruong;
        public string gioitinh;
        public string thucan;

        public virtual void Dichuyen()
        {
        }
        public virtual void an()
        {
        }
        public virtual void angi(string food)
        {
        }
        public virtual void ngonngu()
        {
        }

    }

    public class Meo : Dongvat  ,Idongvat
    {
        public override void Dichuyen()
        {
            Debug.Log("Di bang bon chan");
        }
        public override void an()
        {
            Debug.Log("an thit");
        }
       
        public override void ngonngu()
        {
            Debug.Log("Keu meo meo");
        }
    }
    public class Chim : Dongvat, Idongvat
    {
        public override void Dichuyen()
        {
            Debug.Log("bay bang canh");
        }
        public override void an()
        {
            Debug.Log("sau bo");
        }

        public override void ngonngu()
        {
            Debug.Log("Hot hot");
        }
    }

    public class Ca : Dongvat, Idongvat
    {
        public override void Dichuyen()
        {
            Debug.Log("boi");
        }
        public override void an()
        {
            Debug.Log("sinh vat nho");
        }

        public override void ngonngu()
        {
            Debug.Log("quay nuoc");
        }
    }
    public abstract class Dongvat1 : Dongvat
    {

        public abstract void MuonThu();


    }
    public interface Idongvat 
    {
    
    
    
    
    }
    // Update is called once per frame
   void Update()
    {
        
    }
}
