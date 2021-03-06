﻿using System;

namespace Mp3TagLib
{
     [Serializable]
    public enum MaskItemType { Delimiter,TagName}
   [Serializable]
    public class MaskItem
    {
        public MaskItemType Type { get; set; }
        public string Value { get; set; }
      
       public override bool Equals(object obj)
        {
            var item=obj as MaskItem;
           
            if (item == null)
                return false;
           
            return Type == item.Type && Value == item.Value;
        }

        public override int GetHashCode()
        {
            return (Value + Type).GetHashCode();
        }
    }
}
