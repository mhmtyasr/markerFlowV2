using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using MarkerFlow.MultiTenancy;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarkerFlow.Comments
{
    [Table("Comments")]
    public class Comments : FullAuditedEntity<int>, IMustHaveTenant
    {
        public int TenantId { get; set; }
        public string Comment { get; set; }
        public string Element { get; set; }
        public int TopicId { get; set; }
        public string MentionUserIds { get; set; }

        [ForeignKey(nameof(TopicId))]
        public virtual Topics.Topics Topic { get; set; }

    }
}


