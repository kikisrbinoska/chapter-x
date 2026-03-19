using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.NeedApproval.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly INeedApprovalRepository _needApprovalRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(INeedApprovalRepository needApprovalRepository, ILogger<GetHandler> logger)
        {
            _needApprovalRepository = needApprovalRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var needApproval = await _needApprovalRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(needApproval);
        }
    }
}
