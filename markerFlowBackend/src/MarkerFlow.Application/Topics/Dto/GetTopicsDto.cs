using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarkerFlow.Topics.Dto
{
    public class GetTopicsDto
    {
        public string Title { get; set; }
        public string PageUrl { get; set; }
        public string PageIconUrl { get; set; }
        public string Comment { get; set; }
        public string Element { get; set; }
        public long Id { get; set; }
        public long CreatorUserId { get; set; }
        public List<int>? MentionUserIds { get; set; }
        public int CommentCount { get; set; }
        public DateTime CreationTime { get; set; }
        public string CreateUserFullName { get; set; }


    }
}
