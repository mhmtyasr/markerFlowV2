using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarkerFlow.Topics.Dto
{ 
    public class TopicsMapProfile : Profile
    {
        public TopicsMapProfile()
        {
            CreateMap<GetTopicsDto, Topics>().ReverseMap();

            CreateMap<PostTopicDto, Topics>().ReverseMap();
        }
    }
}
