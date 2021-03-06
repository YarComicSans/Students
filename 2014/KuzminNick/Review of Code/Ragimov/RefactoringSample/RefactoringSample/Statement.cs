﻿using System.Collections.Generic;
using System.Runtime.Serialization;

namespace RefactoringSample
{
    [DataContract]
    public class Statement
    {
        public readonly Customer Customer;

        [DataMember]
        public string Name;
        [DataMember]
        public double TotalAmount;
        [DataMember]
        public int FrequentRenterPoints;

        [DataMember]
        public readonly Dictionary<string, double> MoviePrices;

        public Statement(Customer customer)
        {
            Customer = customer;
            
            MoviePrices = new Dictionary<string, double>();

            TotalAmount = 0;
            FrequentRenterPoints = 0;
            Name = Customer.Name;

            foreach (var rental in Customer.Rentals)
            {
                var thisAmount = rental.GetCharge();

                FrequentRenterPoints += rental.GetFrequentPoints();

                MoviePrices[rental.Movie.Title] = thisAmount;
                TotalAmount += thisAmount;
            }
        }
    }
}
