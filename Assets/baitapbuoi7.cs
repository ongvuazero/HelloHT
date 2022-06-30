using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class baitapbuoi7 : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        PC me = new PC();
        me.epxung();
        PC.ChuSoHuu = "MoDungPhuc";
        PC.DiaChiWifi = "192.168.0.254";
        PC.TocDoWifi = 1000;
    }

    public class PC
    {

        public float Case;
        public float Mainboard;
        public float Ram;
        public float Cpu;
        public float Nguon;
        public float tannhiet;
        public float Fan;

        public void khoidong()
        {

        }

        public void tatmay()
        {

        }
        public void epxung()
        {

        }
        public void truyennhandulieu()
        {

        }

        public static string DiaChiWifi;
        public static int TocDoWifi;
        public static string ChuSoHuu;

    }



    // Update is called once per frame
    void Update()
    {

    }






}
