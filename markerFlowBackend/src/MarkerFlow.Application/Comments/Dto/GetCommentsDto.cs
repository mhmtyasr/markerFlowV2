using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarkerFlow.Comments.Dto
{
    public class GetCommentsDto
    {
        public string Comment { get; set; }
        public string Element { get; set; }
        public long Id { get; set; }
        public long CreatorUserId { get; set; }
        public List<int>? MentionUserIds { get; set; }
        public DateTime CreationTime { get; set;}
        public string CreatorUserName { get; set; }

    }
}
