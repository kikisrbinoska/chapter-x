using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.PermissionLevel.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IPermissionLevelRepository _permissionLevelRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IPermissionLevelRepository permissionLevelRepository, ILogger<GetHandler> logger)
        {
            _permissionLevelRepository = permissionLevelRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var permissionLevel = await _permissionLevelRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(permissionLevel);
        }
    }
}
