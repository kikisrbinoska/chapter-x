using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.NeedApproval.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly INeedApprovalRepository _needApprovalRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(INeedApprovalRepository needApprovalRepository, ILogger<AddHandler> logger)
        {
            _needApprovalRepository = needApprovalRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var needApproval = new Domain.Entities.NeedApproval
            {
                StoryId = request.StoryId
            };

            await _needApprovalRepository.AddAsync(needApproval, cancellationToken);

            return new AddResponse(needApproval.Id);
        }
    }
}
